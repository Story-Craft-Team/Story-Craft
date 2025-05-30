import { ApiProperty } from "@nestjs/swagger";
import { UserWithoutPassword } from "src/common/types/UserWithoutPassword";

export class SetPlan {
  @ApiProperty({
    description: 'User information without password',
    example: {     
        id: 1,
        username: "john_doe",
        email: "john.doe@example.com",
        role: "reader",
        createdAt: "2025-05-23T11:16:25.780Z",
        updatedAt: "2025-05-30T07:03:54.604Z",
        isVerified: true,
        displayName: "John Doe",
        bio: null,
        avatarUrl: "https://example.com/avatar.jpg",
        plan: "level_1",
        planWillDeleteAt: "2025-06-30T07:03:54.602Z",
        planCreatedAt: "2025-05-30T07:03:54.602Z"
    },
  })
  user: UserWithoutPassword;
}

export class CheckPlan {
  @ApiProperty({
    description: 'User`s plan information',
    example: {
        plan: "level_2",
        planWillDeleteAt: "2025-06-21T22:20:36.000Z",
        planCreatedAt: "2025-05-21T22:20:36.000Z"
    },
  })
  user: UserWithoutPassword;
}

export class CheckFirstLevel {
  @ApiProperty({
    description: 'User`s plan level',
    example: {
        "lvl1": true
    },
  })
  user: UserWithoutPassword;
}

export class CheckSecondLevel {
  @ApiProperty({
    description: 'User`s plan level',
    example: {
        "lvl2": true
    },
  })
  user: UserWithoutPassword;
}