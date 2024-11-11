import e from "express";
import { CollectionConfig, PayloadRequest } from "payload/types";
import jwt from "jsonwebtoken";

const OAUTH_SECRET = "aF2d3f4g5h6j7k8l9";

const loginWithUserId = async (req: PayloadRequest, res: e.Response) => {
  const { uid } = req.body;

  try {
    const user = await req.payload.findByID({
      collection: "users",
      id: uid,
    });

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    const token = jwt.sign({ uid: user.id, email: user.email }, OAUTH_SECRET);

    return res.send({ token, user });
  } catch (err) {
    return res.status(401).send({ error: err });
  }
};

const registerOAuth = async (req: PayloadRequest, res: e.Response) => {
  const { email, name, provider } = req.body;

  try {
    await req.payload.create({
      collection: "users",
      data: {
        email,
        password: OAUTH_SECRET,
        name,
        provider,
        role: "user",
        status: "active",
      },
    });

    const loginResponse = await req.payload.login({
      collection: "users",
      data: { email, password: OAUTH_SECRET },
    });

    return res.send(loginResponse);
  } catch (err) {
    return res.status(401).send({ error: err });
  }
};

const loginOAuth = async (req: PayloadRequest, res: e.Response) => {
  const { email } = req.body;
  try {
    const users = await req.payload.find({
      collection: "users",
      where: { email },
    });

    if (users.docs.length === 0) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const user = users.docs[0];

    const token = jwt.sign({ uid: user.id, email: user.email }, OAUTH_SECRET);

    return res.send({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(401).send({ error: "Invalid email or password" });
  }
};

const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    // create: ({ req }) => {
    //   return req.user.role === "admin";
    // },
  },
  auth: {
    maxLoginAttempts: 199,
    verify: {
      generateEmailSubject: () => "Fireflies - Verify Your Email",
      generateEmailHTML: ({ token, user }) => {
        const verifyEmailUrl = `${process.env.VERIFY_EMAIL_URL}?token=${token}&uid=${user.id}`;

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fireflies - Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #444;
            font-size: 24px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .btn {
          display: inline-block;
          padding: 12px 20px;
          background-color: #00adb5;
          color: #ffffff;
          text-decoration: none;
          border-radius: 20px;
          font-size: 16px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Confirmation</h1>
        <p>Hello,</p>
        <p>Welcome to Fireflies! To complete your registration, please click the button below to verify your email address.</p>
        <a href="${verifyEmailUrl}" class="btn">Verify Email</a>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p><a href="${verifyEmailUrl}">${verifyEmailUrl}</a></p>
    </div>
</body>
</html>`;
      },
    },

    forgotPassword: {
      generateEmailHTML: ({ token }) => {
        // Use the token provided to allow your user to reset their password
        const resetPasswordURL = `${process.env.RESET_PASSWORD_URL}?token=${token}`;

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fireflies - Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #444;
            font-size: 24px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
        }
        .btn {
          display: inline-block;
          padding: 12px 20px;
          background-color: #00adb5;
          color: #ffffff;
          text-decoration: none;
          border-radius: 20px;
          font-size: 16px;
        }
        .btn:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #888;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Hello,</p>
        <p>We received a request to reset the password for your account. If you made this request, click the button below to reset your password. If you did not make this request, you can safely ignore this email.</p>
        <a href="${resetPasswordURL}" class="btn">Reset Password</a>
        <p>If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p><a href="${resetPasswordURL}">${resetPasswordURL}</a></p>
        <div class="footer">
            <p>If you did not request a password reset, no further action is required.</p>
            <p>Thank you, <br>Fireflies Team</p>
        </div>
    </div>
</body>
</html>`;
      },
    },
  },

  admin: {
    useAsTitle: "email",
    livePreview: {
      url: "preview",
    },
    // components: {
    //   views: {
    //     Edit: {
    //       LivePreview: UserPreview,
    //     },
    //   },
    // },
  },
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      maxDepth: 3,
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      defaultValue: "Anonymous",
    },
    {
      name: "provider",
      type: "text",
      label: "Provider",
      defaultValue: "email",
    },
    {
      name: "status",
      type: "radio",
      options: ["active", "inactive", "banned", "blocked"],
      required: true,
      defaultValue: "active",
      // admin: {
      //   components: {
      //     Cell: UserCell,
      //   },
      // },
    },
  ],

  endpoints: [
    {
      path: "/oauth-register",
      method: "post",
      handler: registerOAuth,
    },
    {
      path: "/oauth-login",
      method: "post",
      handler: loginOAuth,
    },
    {
      path: "/authenticate",
      method: "post",
      handler: loginWithUserId,
    },
    {
      path: "/reset-password",
      method: "post",
      handler: async (req, res) => {
        const { password, token } = req.body;

        await req.payload.resetPassword({
          collection: "users",
          overrideAccess: true,
          data: {
            token,
            password,
          },
        });

        return res.send({ message: "success" });
      },
    },
    {
      path: "/send-email",
      method: "post",
      handler: async (req, res) => {
        const { email, name } = req.body;
        req.payload.sendEmail({
          from: "noreply@notification.firefliestoken.com",
          to: email,
          subject: "Welcome to Fireflies",
          html: `<p>Hello ${name},</p><p>Welcome to Fireflies! We're excited to have you on board.</p>`,
        });

        res.send({ message: "success" });
      },
    },
  ],
};

export default Users;
