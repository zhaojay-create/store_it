"use server";

import { Query, ID } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

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

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw new Error(message);
};

const sendEmailODP = async ({ email }: { email: string }) => {
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
        avatar: "/public/assets/avatar.png",
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
