"use server";

import { Query, ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { handleError } from "./base";

// 创建账户流
// 1. 用户输入 fullName  & email
// 2. check email 是否存在，不存在就创建用户
// 3. 发送 OTP 到用户邮箱 One-Time Password
// 4. 发送一个密钥来创建 session
// 5. 如果用户是一个新用户，就创建新用户
// 6. 返回用户的 accountId 来完成登录
// 7. 验证 OTP 并进行身份验证以登录

// 根据 email 获取用户
const getUserbyEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

export const sendEmailODP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();

  try {
    // 创建 email token 根据 唯一ID 和 email
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to create email token");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserbyEmail(email);
  const accountid = await sendEmailODP({ email });

  if (!accountid) throw new Error("failed to send ODP");

  if (!existingUser) {
    const { databases } = await createAdminClient();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: "/assets/avatar.png",
        accountId: accountid,
      }
    );
  }

  return parseStringify({ accountId: accountid });
};

// 验证OTP
export const verifyOTP = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(accountId, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};

// 获取当前用户信息
export const getCurrentUser = async () => {
  const { databases, account } = await createSessionClient();

  const result = await account.get();

  const user = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("accountId", result.$id)]
  );

  if (user.total <= 0) return null;
  return parseStringify(user.documents[0]);
};

// 登出当前用户
export const signOutUser = async () => {
  const { account } = await createSessionClient();
  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/");
  }
};

// 登录
export const signInUser = async ({ email }: { email: string }) => {
  try {
    const existingUser = await getUserbyEmail(email);

    if (existingUser) {
      await sendEmailODP({ email });
      return parseStringify({ accountId: existingUser.accountId });
    }

    return parseStringify({ accountId: null, error: "User not found" });
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
