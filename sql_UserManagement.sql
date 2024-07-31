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

	alte

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
ADD DEFAULT 1 FOR CREATEDBY;
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
ADD DEFAULT 1 FOR CREATEDBY;
ALTER TABLE S_ADDRESS 
ADD DEFAULT 'admin' FOR MODIFIEDBY;
ALTER TABLE S_ADDRESS 
ADD DEFAULT 'admin' FOR DELETEDBY;


--create or alter procedure createuser_usp
-- @FirstName,
-- @MiddleName,
-- @LastName,
-- @Gender,
-- @DateOfJoining,
-- @DOB,
-- @Email,
-- @Password,
-- @Phone,
-- @AlternatePhone,
-- @ImagePath,
-- @Address,
-- @City,
-- @State,
-- @Country,
-- @ZipCode,

 alter table S_Address drop column addresstypeId;

 CREATE OR ALTER PROCEDURE createuser_usp1
    @FirstName nvarchar(50),
    @MiddleName nvarchar(50),
    @LastName nvarchar(50),
    @Gender varchar(10),
    @DateOfJoining date,
    @DOB date,
    @Email nvarchar(max),
    @Password nvarchar(max),
    @Phone nvarchar(max),
    @AlternatePhone nvarchar(max),
    @ImagePath varchar(255),
    @Address varchar(100),
    @City varchar(50),
    @State varchar(50),
    @Country varchar(50),
    @ZipCode varchar(10)
	
AS
BEGIN
    DECLARE @UserId int;
    DECLARE @AddressId int;

    BEGIN TRANSACTION;

    BEGIN TRY
        -- Insert into S_USER table
        INSERT INTO S_USER (FirstName, MiddleName, LastName, Gender, DateOfJoining, DOB, Email, [Password], Phone, AlternatePhone, ImagePath)
        VALUES (@FirstName, @MiddleName, @LastName, @Gender, @DateOfJoining, @DOB, @Email, @Password, @Phone, @AlternatePhone, @ImagePath);

        SET @UserId = SCOPE_IDENTITY();

        -- Insert into S_ADDRESS table
        INSERT INTO S_ADDRESS ([Address], City, [State], Country, ZipCode, UserId)
        VALUES (@Address, @City, @State, @Country, @ZipCode, @UserId);  -- Assuming AddressTypeId is 1 for user's primary address

        SET @AddressId = SCOPE_IDENTITY();

        COMMIT TRANSACTION;

        SELECT @UserId AS UserId, @AddressId AS AddressId;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage nvarchar(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH;
END;



SELECT * FROM S_USER;
SELECT * FROM S_ADDRESS;


--drop table S_User
EXEC createuser_usp1
    @FirstName = 'ankit',
    @MiddleName = 'Doe',
    @LastName = 'baskandi',
    @Gender = 'Male',
    @DateOfJoining = '2022-01-01',
    @DOB = '1990-01-01',
    @Email = 'john.smith@example.com',
    @Password = 'password123',
    @Phone = '123-456-7890',
    @AlternatePhone = '098-765-4321',
    @ImagePath = '/path/to/image.jpg',
    @Address = '123 Main St',
    @City = 'Anytown',
    @State = 'CA',
    @Country = 'USA',
    @ZipCode = '12345';



	CREATE OR ALTER PROCEDURE deleteUser_usp
    @UserId int
AS
BEGIN
    DECLARE @DeletedBy int = 1;
    DECLARE @DeletedDate datetime = GETDATE();

    BEGIN TRANSACTION;

    BEGIN TRY
       
        UPDATE S_USER
        SET IsDeleted = 1, DeletedBy = @DeletedBy, DeletedDate = @DeletedDate,isActive=0
        WHERE UserId = @UserId;

        -- Delete the corresponding address(es) from S_ADDRESS table
         UPDATE S_ADDRESS
        SET IsDeleted = 1, DeletedBy = @DeletedBy, DeletedDate = @DeletedDate
        WHERE UserId = @UserId;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage nvarchar(4000);
        SET @ErrorMessage = ERROR_MESSAGE();
        RAISERROR (@ErrorMessage, 16, 1);
    END CATCH;
END;
EXEC deleteUser_usp @UserId = 4;
ALTER TABLE S_Address
ADD IsDeleted bit DEFAULT 0 NOT NULL;

SELECT * FROM S_USER;
SELECT * FROM S_ADDRESS;

ALTER TABLE S_USER
DROP IsActive;

--ALTER TABLE S_USER
--DROP CONSTRAINT DF__S_USER__IsActive__22EAEC0F;

--SELECT *
--FROM sys.default_constraints
--WHERE parent_object_id = OBJECT_ID('S_USER')
--    AND parent_column_id = (SELECT column_id FROM sys.columns WHERE object_id = OBJECT_ID('S_USER') AND name = 'IsActive');
	

	SELECT * FROM sys.procedures WHERE name = 'createusersp1';


SELECT *
FROM S_USER u
INNER JOIN S_ADDRESS a
ON u.UserId = a.UserId;


TRUNCATE TABLE S_USER;
DELETE FROM S_USER;
TRUNCATE TABLE S_ADDRESS;




ALTER TABLE S_user
ADD CONSTRAINT df_isActive
DEFAULT 1 FOR isActive;
SELECT 
    OBJECT_NAME(OBJECT_ID) AS TableName,
    name AS ConstraintName,
    type_desc AS ConstraintType
FROM 
    sys.constraints
ORDER BY 
    TableName, ConstraintName;
	

	SELECT *
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID('S_USER')
   AND parent_column_id = (SELECT column_id FROM sys.columns WHERE object_id = OBJECT_ID('S_USER') AND name = 'DeletedBy');
   ALTER TABLE S_USER
DROP CONSTRAINT DF__S_USER__DeletedB__2CC95C04;
SELECT *
FROM sys.default_constraints
WHERE parent_object_id = OBJECT_ID('S_ADDRESS')
   AND parent_column_id = (SELECT column_id FROM sys.columns WHERE object_id = OBJECT_ID('S_ADDRESS') AND name = 'DeletedBy');
   ALTER TABLE S_ADDRESS
DROP CONSTRAINT DF__S_ADDRESS__Modif__33765993;