import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserById, putUserRole } from '../../../database/users';
import { UserAll } from '../../../migrations/00004-createTableUsers';

// get user
type UserResponseBodyGet =
  | { user: UserAll }
  | {
      error: string;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyGet>> {
  const userId = Number(1);

  const user = await getUserById(userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ user: user });
}

// put user roll

export type PutUserRoleBodyPost =
  | {
      user: UserAll[];
    }
  | {
      errors: { message: string | number }[];
    };

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<PutUserRoleBodyPost>> {
  //  Get the user data from the request
  const body = await request.json();

  const updatedUserWithMatchingInfo = await putUserRole(
    Number(body.userId),
    Number(body.roleId),
  );

  return NextResponse.json({
    user: updatedUserWithMatchingInfo,
  });
}
