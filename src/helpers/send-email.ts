import nodemailer from 'nodemailer';
import { config } from '../config/envConfig';

export const sendEmail = async (
  to: string,
  subject: string,
  name: string,
  token: string,
  confirm: boolean = true
) => {
  const emailHTML = `
<body>
  <div style="
      height: 450;
      background-color: white;
    ">
    <img src="https://res.cloudinary.com/fercloudinary/image/upload/v1654701695/eCommerce_LOGO_vqwfni.jpg" style="
      margin: 0 auto;
      display: block;
      width: 200px;
    " />
    <h3 style="text-align: center">This is an automated message from the server, please don't reply.</h3>
    <h4 style="text-align: center">Hello ${name}, click in the button to ${
    confirm ? 'confirm your account' : 'change your password'
  }</h4>
  <div style="display: flex; justify-content: center; align-items: center">
  <a
  style="
  padding: 10px;
  margin: 10 auto;
  background-color: #0080ff;
  border-radius: 3px;
  border-color: #0080ff;
  cursor: pointer;
  color: aliceblue;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  "
  target="_blank"
  href='${config.frontUrl}/${subject}/${token && token}'
>
  ${confirm ? 'confirm your account' : 'change your password'}
</a>
</div>
    <div style="
  height: 80px;
  background-color: #0080ff">
      <a href="#" style="
    text-decoration: none;
    text-align: center;
    padding: 25px;
    color: white;
    display: block;
    font-size: large;
  ">ElectroStore © ${new Date().getFullYear()}</a>
    </div>
  </div>
</body>
`;

  const transport: nodemailer.Transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: Number(config.emailPort),
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });

  try {
    await transport.sendMail({
      from: '"No-Reply ElectroStore" <no-reply@ecommerce.com>',
      to,
      subject,
      html: emailHTML,
      text: `Copy the next link in your browser to ${
        confirm ? 'confirm your account: ' : 'change your password: '
      }
      ${config.frontUrl}/${subject}/${token && token}
      `,
    });

    return { msg: 'OK' };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
