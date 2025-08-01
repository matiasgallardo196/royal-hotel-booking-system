# ⚙️ Backend Guide - Royal Hotel Booking System

## 🚀 Technologies Used

- **Node.js** - JavaScript runtime
- **TypeScript** - Type-safe JavaScript superset
- **Express.js** - Web framework
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - Relational database
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **SendGrid** - Email service
- **Cloudinary** - Image storage

## 📁 Project Structure

```
back/src/
├── config/           # Configuration
│   ├── data-source.ts # TypeORM configuration
│   └── envs.ts       # Environment variables
├── controllers/      # API controllers
│   ├── userController.ts
│   └── appointmentsController.ts
├── dto/             # Data Transfer Objects
│   ├── userDto.ts
│   ├── credentialDto.ts
│   └── appointmentDto.ts
├── entities/        # TypeORM entities
│   ├── User.ts
│   ├── Credential.ts
│   └── Appointment.ts
├── interfaces/      # TypeScript interfaces
│   ├── IUser.ts
│   ├── ICredential.ts
│   ├── IAppointment.ts
│   └── ILogin.ts
├── middlewares/     # Express middlewares
│   ├── auth.ts
│   ├── validateUserDto.ts
│   ├── validateCredentialDto.ts
│   └── validateDtoId.ts
├── repositories/    # Data repositories
│   ├── userRepository.ts
│   ├── credentialRepository.ts
│   └── appointmentRepository.ts
├── routes/          # API routes
│   ├── indexRouter.ts
│   ├── userRouter.ts
│   └── appointmentsRouter.ts
├── services/        # Business logic
│   ├── usersService.ts
│   ├── credentialService.ts
│   └── AppointmentService.ts
├── utils/           # Utilities and helpers
│   ├── authUtils.ts
│   ├── hashUtils.ts
│   ├── mailSender.ts
│   └── catchAsync.ts
├── index.ts         # Entry point
└── server.ts        # Server configuration
```

## 🔧 Configuration

### Environment Variables

```typescript
// config/envs.ts
export const PORT = process.env.PORT;
export const HOST = process.env.HOST;
export const PORTDB = Number(process.env.PORTDB);
export const USERNAMEDB = process.env.USERNAMEDB;
export const PASSDB = process.env.PASSDB;
export const DB = process.env.DB;
export const SALT_ROUNDS = process.env.SALT_ROUNDS;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ENVIRONMENT = process.env.ENVIRONMENT === "development";
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const EMAIL_FROM = process.env.EMAIL_FROM;
```

### Database

```typescript
// config/data-source.ts
export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: PORTDB,
  username: USERNAMEDB,
  password: PASSDB,
  database: DB,
  synchronize: true,
  dropSchema: false,
  logging: false,
  entities: [User, Credential, Appointment],
  subscribers: [],
  migrations: [],
});
```

## ��️ Architecture

### MVC + Layers Pattern

1. **Controllers** - Handle HTTP requests
2. **Services** - Contain business logic
3. **Repositories** - Access data
4. **Entities** - Data models
5. **DTOs** - Data transfer objects

## 📋 Entities

### User

```typescript
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: "date", nullable: false })
  birthdate: Date;

  @Column({ type: "integer", nullable: false })
  nDni: number;

  @Column({ type: "text", nullable: true })
  file: string | null;

  @OneToOne(() => Credential, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  credentials: Credential;

  @OneToMany(() => Appointment, (appointment) => appointment.user, {
    cascade: true,
  })
  appointments: Appointment[];
}
```

### Credential

```typescript
@Entity()
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ select: false, nullable: false })
  password: string;
}
```

### Appointment

```typescript
@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  time: string;

  @ManyToOne(() => User, (user) => user.appointments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.active,
    nullable: false,
  })
  status: AppointmentStatus;
}
```

## 🎯 Controllers

### UserController

```typescript
const userController = {
  getUsers: catchAsync(getUsers),
  postUsersRegister: catchAsync(postUsersRegister),
  postUsersLogin: catchAsync(postUsersLogin),
  getUsersById: catchAsync(getUsersById),
};
```

**Functions:**

- `getUsers()` - Get all users
- `postUsersRegister()` - Register new user
- `postUsersLogin()` - Log in
- `getUsersById()` - Get user by ID

### AppointmentsController

```typescript
const appointmentsController = {
  getAppointments: catchAsync(getAppointments),
  postAppointmentsSchedule: catchAsync(postAppointmentsSchedule),
  putAppointmentsCancel: catchAsync(putAppointmentsCancel),
  getAppointmentsById: catchAsync(getAppointmentsById),
};
```

**Functions:**

- `getAppointments()` - Get all appointments
- `postAppointmentsSchedule()` - Create new appointment
- `putAppointmentsCancel()` - Cancel appointment
- `getAppointmentsById()` - Get appointment by ID

## 🔧 Services

### UsersService

```typescript
export const postUsersRegisterService = async (
  userData: UserDto
): Promise<User> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const credentials = await createCredentialService(
      {
        username: userData.email,
        password: userData.password,
      },
      queryRunner.manager
    );

    const newUser = await queryRunner.manager.create(User, {
      name: userData.name,
      email: userData.email,
      birthdate: userData.birthdate,
      nDni: userData.nDni,
      file: userData.file,
      credentials,
    });

    const resultnewUser = await queryRunner.manager.save(newUser);
    await queryRunner.commitTransaction();

    // Send welcome email
    await sender(
      resultnewUser.email,
      "Welcome",
      `<h2>Hello ${resultnewUser.name} 👋</h2><p>Thank you for registering.</p>`
    );

    return resultnewUser;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw {
      error: "UserCreationFailed",
      message: "Error registering user",
      status: 400,
    };
  } finally {
    await queryRunner.release();
  }
};
```

### AppointmentService

```typescript
export const postAppointmentsScheduleService = async (
  data: AppointmentScheduleDto
): Promise<Appointment> => {
  const user = await userRepository.findUsersById(data.userId);

  const newAppointment = await appointmenRepository.create({
    date: data.date,
    time: data.time,
    user: user,
  });

  const resultNewAppointment = await appointmenRepository.save(newAppointment);

  // Send confirmation email
  await sender(
    newAppointment.user.email,
    "Appointment Created",
    `<h2>Hello the appointment was created successfully for the day ${newAppointment.date} at ${newAppointment.time} 👋</h2><p>Thank you for scheduling.</p>`
  );

  return resultNewAppointment;
};
```

## 🛡️ Middlewares

### Authentication

```typescript
const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized access" });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "Invalid or expired token" });
    return;
  }

  next();
};
```

### DTO Validation

```typescript
// validateUserDto.ts
export const validateUserDto = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validateSync(plainToClass(UserDto, req.body));

  if (errors.length > 0) {
    return res.status(400).json({
      error: "ValidationError",
      message: "Invalid input data",
      details: errors,
    });
  }

  next();
};
```

## 🔐 Utilities

### JWT Authentication

```typescript
// authUtils.ts
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET as string, { expiresIn: "24h" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};
```

### Encryption

```typescript
// hashUtils.ts
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, Number(SALT_ROUNDS));
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
```

### Email Sending

```typescript
// mailSender.ts
export const sender = async (
  to: string,
  titulo: string,
  mensaje: string
): Promise<void> => {
  try {
    await sgMail.send({
      to,
      from: EMAIL_FROM as string,
      subject: titulo,
      html: mensaje,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
```

## 🛠️ Error Handling

### CatchAsync

```typescript
// catchAsync.ts
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
```

### Global Error Handler

```typescript
// server.ts
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (ENVIRONMENT) {
    res.status(err.status || 500).json({
      error: err.error || "UnknownError",
      message: err.message || "An unexpected error occurred",
      details: err.details,
    });
  } else {
    res.status(err.status || 500).json({
      error: err.error || "UnknownError",
      message: err.message || "An unexpected error occurred",
    });
  }
});
```

## 🔄 Transactions

The system uses transactions for critical operations:

```typescript
const queryRunner = AppDataSource.createQueryRunner();
await queryRunner.connect();
await queryRunner.startTransaction();

try {
  // Database operations
  await queryRunner.commitTransaction();
} catch (error) {
  await queryRunner.rollbackTransaction();
  throw error;
} finally {
  await queryRunner.release();
}
```

## 📊 Repositories

### UserRepository

```typescript
class UserRepository extends Repository<User> {
  async findUsersById(id: number): Promise<User | null> {
    return this.findOne({
      where: { id },
      relations: ["credentials", "appointments"],
    });
  }
}
```

### AppointmentRepository

```typescript
class AppointmentRepository extends Repository<Appointment> {
  async findAppointmentById(id: number): Promise<Appointment> {
    const appointment = await this.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!appointment) {
      throw {
        error: "AppointmentNotFound",
        message: "Appointment not found",
        status: 404,
      };
    }

    return appointment;
  }
}
```

## 🚀 Scripts

```json
{
  "scripts": {
    "start": "kill-port 3000 && nodemon",
    "build": "tsc",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## 📦 Main Dependencies

```json
{
  "dependencies": {
    "express": "^4.21.2",
    "typeorm": "^0.3.21",
    "pg": "^8.14.0",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^3.0.2",
    "@sendgrid/mail": "^8.1.4",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7"
  }
}
```

## 🎯 Best Practices

1. **Separation of Responsibilities**: Each layer has its specific function
2. **Transactions**: For critical operations
3. **Validation**: DTOs with class-validator
4. **Error Handling**: Centralized and consistent
5. **Authentication**: JWT with middleware
6. **Encryption**: Hashed passwords
7. **Logging**: Morgan for HTTP logs
8. **CORS**: Configured for frontend
9. **TypeScript**: Strong typing
10. **Clean Code**: Clean and maintainable code
