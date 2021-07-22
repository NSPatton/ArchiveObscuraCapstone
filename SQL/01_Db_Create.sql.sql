CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255),
  [Email] nvarchar(255),
  [ImageUrl] nvarchar(255),
  [DateCreated] datetime,
  [FirebaseUserId] nvarchar(255)
)
GO

CREATE TABLE [Record] (
  [Id] int PRIMARY KEY,
  [Title] nvarchar(255),
  [ArtistName] nvarchar(255),
  [Description] nvarchar(255),
  [ImageUrl] nvarchar(255),
  [DateCreated] datetime,
  [TagId] int,
  [UserProfileId] int
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY,
  [Name] nvarchar(255)
)
GO

CREATE TABLE [Favorite] (
  [Id] int PRIMARY KEY,
  [RecordId] int,
  [UserProfileId] int
)
GO

ALTER TABLE [Favorite] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Favorite] ADD FOREIGN KEY ([RecordId]) REFERENCES [Record] ([Id])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([Id]) REFERENCES [Record] ([UserProfileId])
GO

ALTER TABLE [Record] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO
