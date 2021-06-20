type Scalars = {
  readonly ID: string;
  readonly Boolean: boolean;
  readonly String: string;
  readonly Int: number;
  readonly Float: number;
  readonly JSON: import('@keystone-next/types').JSONValue;
};

export type UserWhereInput = {
  readonly AND?: ReadonlyArray<UserWhereInput | null> | null;
  readonly OR?: ReadonlyArray<UserWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email?: Scalars['String'] | null;
  readonly email_not?: Scalars['String'] | null;
  readonly email_contains?: Scalars['String'] | null;
  readonly email_not_contains?: Scalars['String'] | null;
  readonly email_starts_with?: Scalars['String'] | null;
  readonly email_not_starts_with?: Scalars['String'] | null;
  readonly email_ends_with?: Scalars['String'] | null;
  readonly email_not_ends_with?: Scalars['String'] | null;
  readonly email_i?: Scalars['String'] | null;
  readonly email_not_i?: Scalars['String'] | null;
  readonly email_contains_i?: Scalars['String'] | null;
  readonly email_not_contains_i?: Scalars['String'] | null;
  readonly email_starts_with_i?: Scalars['String'] | null;
  readonly email_not_starts_with_i?: Scalars['String'] | null;
  readonly email_ends_with_i?: Scalars['String'] | null;
  readonly email_not_ends_with_i?: Scalars['String'] | null;
  readonly email_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly password_is_set?: Scalars['Boolean'] | null;
  readonly passwordResetToken_is_set?: Scalars['Boolean'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_not?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_not?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthToken_is_set?: Scalars['Boolean'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_not?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_not?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
};

export type UserWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortUsersBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'passwordResetIssuedAt_ASC'
  | 'passwordResetIssuedAt_DESC'
  | 'passwordResetRedeemedAt_ASC'
  | 'passwordResetRedeemedAt_DESC'
  | 'magicAuthIssuedAt_ASC'
  | 'magicAuthIssuedAt_DESC'
  | 'magicAuthRedeemedAt_ASC'
  | 'magicAuthRedeemedAt_DESC';

export type UserUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: UserUpdateInput | null;
};

export type UserCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersCreateInput = {
  readonly data?: UserCreateInput | null;
};

export type PosterImageRelateToOneInput = {
  readonly create?: PosterImageCreateInput | null;
  readonly connect?: PosterImageWhereUniqueInput | null;
  readonly disconnect?: PosterImageWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type PosterWhereInput = {
  readonly AND?: ReadonlyArray<PosterWhereInput | null> | null;
  readonly OR?: ReadonlyArray<PosterWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly headliner?: Scalars['String'] | null;
  readonly headliner_not?: Scalars['String'] | null;
  readonly headliner_contains?: Scalars['String'] | null;
  readonly headliner_not_contains?: Scalars['String'] | null;
  readonly headliner_starts_with?: Scalars['String'] | null;
  readonly headliner_not_starts_with?: Scalars['String'] | null;
  readonly headliner_ends_with?: Scalars['String'] | null;
  readonly headliner_not_ends_with?: Scalars['String'] | null;
  readonly headliner_i?: Scalars['String'] | null;
  readonly headliner_not_i?: Scalars['String'] | null;
  readonly headliner_contains_i?: Scalars['String'] | null;
  readonly headliner_not_contains_i?: Scalars['String'] | null;
  readonly headliner_starts_with_i?: Scalars['String'] | null;
  readonly headliner_not_starts_with_i?: Scalars['String'] | null;
  readonly headliner_ends_with_i?: Scalars['String'] | null;
  readonly headliner_not_ends_with_i?: Scalars['String'] | null;
  readonly headliner_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly headliner_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly venue?: Scalars['String'] | null;
  readonly venue_not?: Scalars['String'] | null;
  readonly venue_contains?: Scalars['String'] | null;
  readonly venue_not_contains?: Scalars['String'] | null;
  readonly venue_starts_with?: Scalars['String'] | null;
  readonly venue_not_starts_with?: Scalars['String'] | null;
  readonly venue_ends_with?: Scalars['String'] | null;
  readonly venue_not_ends_with?: Scalars['String'] | null;
  readonly venue_i?: Scalars['String'] | null;
  readonly venue_not_i?: Scalars['String'] | null;
  readonly venue_contains_i?: Scalars['String'] | null;
  readonly venue_not_contains_i?: Scalars['String'] | null;
  readonly venue_starts_with_i?: Scalars['String'] | null;
  readonly venue_not_starts_with_i?: Scalars['String'] | null;
  readonly venue_ends_with_i?: Scalars['String'] | null;
  readonly venue_not_ends_with_i?: Scalars['String'] | null;
  readonly venue_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly venue_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly supportingActs?: Scalars['String'] | null;
  readonly supportingActs_not?: Scalars['String'] | null;
  readonly supportingActs_contains?: Scalars['String'] | null;
  readonly supportingActs_not_contains?: Scalars['String'] | null;
  readonly supportingActs_starts_with?: Scalars['String'] | null;
  readonly supportingActs_not_starts_with?: Scalars['String'] | null;
  readonly supportingActs_ends_with?: Scalars['String'] | null;
  readonly supportingActs_not_ends_with?: Scalars['String'] | null;
  readonly supportingActs_i?: Scalars['String'] | null;
  readonly supportingActs_not_i?: Scalars['String'] | null;
  readonly supportingActs_contains_i?: Scalars['String'] | null;
  readonly supportingActs_not_contains_i?: Scalars['String'] | null;
  readonly supportingActs_starts_with_i?: Scalars['String'] | null;
  readonly supportingActs_not_starts_with_i?: Scalars['String'] | null;
  readonly supportingActs_ends_with_i?: Scalars['String'] | null;
  readonly supportingActs_not_ends_with_i?: Scalars['String'] | null;
  readonly supportingActs_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly supportingActs_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly date?: Scalars['String'] | null;
  readonly date_not?: Scalars['String'] | null;
  readonly date_contains?: Scalars['String'] | null;
  readonly date_not_contains?: Scalars['String'] | null;
  readonly date_starts_with?: Scalars['String'] | null;
  readonly date_not_starts_with?: Scalars['String'] | null;
  readonly date_ends_with?: Scalars['String'] | null;
  readonly date_not_ends_with?: Scalars['String'] | null;
  readonly date_i?: Scalars['String'] | null;
  readonly date_not_i?: Scalars['String'] | null;
  readonly date_contains_i?: Scalars['String'] | null;
  readonly date_not_contains_i?: Scalars['String'] | null;
  readonly date_starts_with_i?: Scalars['String'] | null;
  readonly date_not_starts_with_i?: Scalars['String'] | null;
  readonly date_ends_with_i?: Scalars['String'] | null;
  readonly date_not_ends_with_i?: Scalars['String'] | null;
  readonly date_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly date_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly image?: PosterImageWhereInput | null;
  readonly image_is_null?: Scalars['Boolean'] | null;
};

export type PosterWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortPostersBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'headliner_ASC'
  | 'headliner_DESC'
  | 'venue_ASC'
  | 'venue_DESC'
  | 'supportingActs_ASC'
  | 'supportingActs_DESC'
  | 'date_ASC'
  | 'date_DESC'
  | 'image_ASC'
  | 'image_DESC';

export type PosterUpdateInput = {
  readonly headliner?: Scalars['String'] | null;
  readonly venue?: Scalars['String'] | null;
  readonly supportingActs?: Scalars['String'] | null;
  readonly date?: Scalars['String'] | null;
  readonly image?: PosterImageRelateToOneInput | null;
};

export type PostersUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: PosterUpdateInput | null;
};

export type PosterCreateInput = {
  readonly headliner?: Scalars['String'] | null;
  readonly venue?: Scalars['String'] | null;
  readonly supportingActs?: Scalars['String'] | null;
  readonly date?: Scalars['String'] | null;
  readonly image?: PosterImageRelateToOneInput | null;
};

export type PostersCreateInput = {
  readonly data?: PosterCreateInput | null;
};

export type CloudinaryImageFormat = {
  readonly prettyName?: Scalars['String'] | null;
  readonly width?: Scalars['String'] | null;
  readonly height?: Scalars['String'] | null;
  readonly crop?: Scalars['String'] | null;
  readonly aspect_ratio?: Scalars['String'] | null;
  readonly gravity?: Scalars['String'] | null;
  readonly zoom?: Scalars['String'] | null;
  readonly x?: Scalars['String'] | null;
  readonly y?: Scalars['String'] | null;
  readonly format?: Scalars['String'] | null;
  readonly fetch_format?: Scalars['String'] | null;
  readonly quality?: Scalars['String'] | null;
  readonly radius?: Scalars['String'] | null;
  readonly angle?: Scalars['String'] | null;
  readonly effect?: Scalars['String'] | null;
  readonly opacity?: Scalars['String'] | null;
  readonly border?: Scalars['String'] | null;
  readonly background?: Scalars['String'] | null;
  readonly overlay?: Scalars['String'] | null;
  readonly underlay?: Scalars['String'] | null;
  readonly default_image?: Scalars['String'] | null;
  readonly delay?: Scalars['String'] | null;
  readonly color?: Scalars['String'] | null;
  readonly color_space?: Scalars['String'] | null;
  readonly dpr?: Scalars['String'] | null;
  readonly page?: Scalars['String'] | null;
  readonly density?: Scalars['String'] | null;
  readonly flags?: Scalars['String'] | null;
  readonly transformation?: Scalars['String'] | null;
};

export type PosterRelateToOneInput = {
  readonly create?: PosterCreateInput | null;
  readonly connect?: PosterWhereUniqueInput | null;
  readonly disconnect?: PosterWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type PosterImageWhereInput = {
  readonly AND?: ReadonlyArray<PosterImageWhereInput | null> | null;
  readonly OR?: ReadonlyArray<PosterImageWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly image?: Scalars['String'] | null;
  readonly image_not?: Scalars['String'] | null;
  readonly image_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly image_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly altText?: Scalars['String'] | null;
  readonly altText_not?: Scalars['String'] | null;
  readonly altText_contains?: Scalars['String'] | null;
  readonly altText_not_contains?: Scalars['String'] | null;
  readonly altText_starts_with?: Scalars['String'] | null;
  readonly altText_not_starts_with?: Scalars['String'] | null;
  readonly altText_ends_with?: Scalars['String'] | null;
  readonly altText_not_ends_with?: Scalars['String'] | null;
  readonly altText_i?: Scalars['String'] | null;
  readonly altText_not_i?: Scalars['String'] | null;
  readonly altText_contains_i?: Scalars['String'] | null;
  readonly altText_not_contains_i?: Scalars['String'] | null;
  readonly altText_starts_with_i?: Scalars['String'] | null;
  readonly altText_not_starts_with_i?: Scalars['String'] | null;
  readonly altText_ends_with_i?: Scalars['String'] | null;
  readonly altText_not_ends_with_i?: Scalars['String'] | null;
  readonly altText_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly altText_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly poster?: PosterWhereInput | null;
  readonly poster_is_null?: Scalars['Boolean'] | null;
};

export type PosterImageWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortPosterImagesBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'altText_ASC'
  | 'altText_DESC'
  | 'poster_ASC'
  | 'poster_DESC';

export type PosterImageUpdateInput = {
  readonly image?: any | null;
  readonly altText?: Scalars['String'] | null;
  readonly poster?: PosterRelateToOneInput | null;
};

export type PosterImagesUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: PosterImageUpdateInput | null;
};

export type PosterImageCreateInput = {
  readonly image?: any | null;
  readonly altText?: Scalars['String'] | null;
  readonly poster?: PosterRelateToOneInput | null;
};

export type PosterImagesCreateInput = {
  readonly data?: PosterImageCreateInput | null;
};

export type _ksListsMetaInput = {
  readonly key?: Scalars['String'] | null;
  readonly auxiliary?: Scalars['Boolean'] | null;
};

export type _ListSchemaFieldsInput = {
  readonly type?: Scalars['String'] | null;
};

export type PasswordAuthErrorCode =
  | 'FAILURE'
  | 'IDENTITY_NOT_FOUND'
  | 'SECRET_NOT_SET'
  | 'MULTIPLE_IDENTITY_MATCHES'
  | 'SECRET_MISMATCH';

export type CreateInitialUserInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
};

export type PasswordResetRequestErrorCode =
  | 'IDENTITY_NOT_FOUND'
  | 'MULTIPLE_IDENTITY_MATCHES';

export type PasswordResetRedemptionErrorCode =
  | 'FAILURE'
  | 'IDENTITY_NOT_FOUND'
  | 'MULTIPLE_IDENTITY_MATCHES'
  | 'TOKEN_NOT_SET'
  | 'TOKEN_MISMATCH'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_REDEEMED';

export type KeystoneAdminUIFieldMetaCreateViewFieldMode = 'edit' | 'hidden';

export type KeystoneAdminUIFieldMetaListViewFieldMode = 'read' | 'hidden';

export type KeystoneAdminUIFieldMetaItemViewFieldMode =
  | 'edit'
  | 'read'
  | 'hidden';

export type KeystoneAdminUISortDirection = 'ASC' | 'DESC';

export type UserListTypeInfo = {
  key: 'User';
  fields:
    | 'id'
    | 'name'
    | 'email'
    | 'password'
    | 'passwordResetToken'
    | 'passwordResetIssuedAt'
    | 'passwordResetRedeemedAt'
    | 'magicAuthToken'
    | 'magicAuthIssuedAt'
    | 'magicAuthRedeemedAt';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly email?: string | null;
    readonly password?: string | null;
    readonly passwordResetToken?: string | null;
    readonly passwordResetIssuedAt?: Date | null;
    readonly passwordResetRedeemedAt?: Date | null;
    readonly magicAuthToken?: string | null;
    readonly magicAuthIssuedAt?: Date | null;
    readonly magicAuthRedeemedAt?: Date | null;
  };
  inputs: {
    where: UserWhereInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: UserWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortUsersBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type UserListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    UserListTypeInfo,
    UserListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  UserListTypeInfo,
  UserListTypeInfo['fields']
>;

export type PosterListTypeInfo = {
  key: 'Poster';
  fields: 'id' | 'headliner' | 'venue' | 'supportingActs' | 'date' | 'image';
  backing: {
    readonly id: string;
    readonly headliner?: string | null;
    readonly venue?: string | null;
    readonly supportingActs?: string | null;
    readonly date?: string | null;
    readonly image?: string | null;
  };
  inputs: {
    where: PosterWhereInput;
    create: PosterCreateInput;
    update: PosterUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: PosterWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortPostersBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type PosterListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    PosterListTypeInfo,
    PosterListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  PosterListTypeInfo,
  PosterListTypeInfo['fields']
>;

export type PosterImageListTypeInfo = {
  key: 'PosterImage';
  fields: 'id' | 'image' | 'altText' | 'poster';
  backing: {
    readonly id: string;
    readonly image?: any;
    readonly altText?: string | null;
    readonly poster?: string | null;
  };
  inputs: {
    where: PosterImageWhereInput;
    create: PosterImageCreateInput;
    update: PosterImageUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: PosterImageWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortPosterImagesBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type PosterImageListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    PosterImageListTypeInfo,
    PosterImageListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  PosterImageListTypeInfo,
  PosterImageListTypeInfo['fields']
>;

export type KeystoneListsTypeInfo = {
  readonly User: UserListTypeInfo;
  readonly Poster: PosterListTypeInfo;
  readonly PosterImage: PosterImageListTypeInfo;
};
