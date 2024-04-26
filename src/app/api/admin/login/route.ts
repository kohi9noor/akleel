import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { SHA256 as sha256 } from "crypto-js";
const scret = new TextEncoder().encode(process.env.JWT_KEY);

const prisma = new PrismaClient();

const alg = "HS256";
const createToken = async (email: string, userId: number) => {
  return await new SignJWT({ email, userId, isAdmin: true })
    .setProtectedHeader({ alg })
    .setExpirationTime("48h")
    .sign(scret);
};

export async function POST(request: Request) {
  // console.log("request hit");

  try {
    const { email, password } = await request.json();

    // console.log(email, password);

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password required",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.admin.findFirst({
      where: {
        email: email,
      },
    });

    // console.log({ password: sha256(password).toString() });

    // console.log(user);

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid Email and password",
        },
        {
          status: 404,
        }
      );
    } else {
      const token = await createToken(user.email, user.id);

      cookies().set("access_token", token);
      return NextResponse.json({
        userInfo: {
          id: user.id,
          email: user.email,
        },
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "An unexpected error occured",
      },
      { status: 500 }
    );
  }
}
