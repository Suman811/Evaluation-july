use test;
CREATE TABLE S_USER (
    UserId int IDENTITY(1,1) PRIMARY KEY,
    FirstName nvarchar(50) NOT NULL,
    MiddleName nvarchar(50) ,
	LastName nvarchar(50) NOT NULL,
    Gender varchar(10) NOT NULL,
    DateOfJoining date NOT NULL,
    DOB date NOT NULL,
    Email nvarchar (max) NOT NULL,
	[Password] nvarchar (max) NOT NULL,
    Phone nvarchar (max) NOT NULL,
    AlternatePhone nvarchar (max),
	ImagePath varchar(255),
	IsActive bit DEFAULT 1 NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	CreatedBy int,
	CreatedDate datetime default getdate(),
	ModifiedBy int,
	ModifiedDate datetime ,
	DeletedBy int,
	DeletedDate datetime
);

CREATE TABLE S_ADDRESS(
   AddressId int identity(1,1) Primary key,
   [Address] varchar(100) NOT NULL,
    City varchar(50) NOT NULL,
    [State] varchar(50) NOT NULL,
    Country varchar(50) NOT NULL,
    ZipCode varchar(10) NOT NULL,
	UserId int NOT NULL,
	AddressTypeId int NOT NULL,
	CreatedBy int ,
	CreatedDate datetime,
	ModifiedBy int,
	ModifiedDate datetime,
	DeletedBy int,
	DeletedDate datetime,
    FOREIGN KEY (UserId)
    REFERENCES S_USER (UserId)
	);



	INSERT INTO S_USER
	(
	FirstName,MiddleName,
	LastName,Gender,
	DateOfJoining,DOB,
	Email,[Password],Phone
	,AlternatePhone,ImagePath) VALUES ('John',
	'Doe','Michael','Male','01-01-2012','01-01-1990',
	'j@gmail.com',
	'Abcd@1234',
	'9876543210','8976543210','/folder/images/a.jpg');


	


	
	create or alter procedure UP_Validate
	@Email varchar(20),
	@Password varchar(20)
	AS 
	BEGIN

	DECLARE @IsValid BIT;
	IF EXISTS(
	SELECT 1
	FROM S_USER
	WHERE Email=@Email AND [Password]=@Password
	)
	BEGIN
	SET @IsValid =1;
	END
	ELSE
	BEGIN
	SET @IsValid =0;
	END
	SELECT @IsValid AS IsValid
	END
	GO

	EXEC SP_Match 'abc@gmail.com','Abc@123';
	





SELECT * FROM S_USER;
SELECT * FROM S_ADDRESS;

drop table S_USER;
drop table S_Address;
delete from S_User where UserId=1;

ALTER TABLE S_uSER aLTER COLUMN MIDDLENAME VARCHAR(50);
ALTER TABLE S_USER ADD CONSTRAINT df_suSER_Createddate default getdate() for CreatedDate ;
--ALTER  TABLE S_USER
--ADD ImagePath varchar(255);
ALTER TABLE S_USER 
ADD DEFAULT 'admin' FOR CREATEDBY;
ALTER TABLE S_USER 
ADD DEFAULT 'admin' FOR MODIFIEDBY;
ALTER TABLE S_USER 
ADD DEFAULT 'admin' FOR DELETEDBY;

ALTER TABLE S_USER ADD CONSTRAINT df_suSER_Modifieddate default getdate() for ModifiedDate ;
ALTER TABLE S_USER ADD CONSTRAINT df_suSER_Deleteddate default getdate() for DeletedDate ;

ALTER TABLE S_ADDRESS ADD CONSTRAINT df_saddress_Createddate default getdate() for CreatedDate ;
ALTER TABLE S_ADDRESS ADD CONSTRAINT df_saddress_Modifieddate default getdate() for ModifiedDate ;
ALTER TABLE S_ADDRESS ADD CONSTRAINT df_saddress_Deleteddate default getdate() for DeletedDate ;


ALTER TABLE S_ADDRESS 
ADD DEFAULT 'admin' FOR CREATEDBY;
ALTER TABLE S_ADDRESS 
ADD DEFAULT 'admin' FOR MODIFIEDBY;
ALTER TABLE S_ADDRESS 
ADD DEFAULT 'admin' FOR DELETEDBY;


create or alter procedure createuser_usp
 @FirstName,
 @MiddleName,
 @LastName,
 @Gender,
 @DateOfJoining,
 @DOB,
 @Email,
 @Password,
 @Phone,
 @AlternatePhone,
 @ImagePath,
 @Address,
 @City,
 @State,
 @Country,
 @ZipCode,

 alter table S_Address drop column addresstypeId

 SELECT * FROM S_USER;
SELECT * FROM S_ADDRESS;


drop table S_User