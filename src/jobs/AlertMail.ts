import Mail from "../lib/Mail";

export default {
  key: "AlertMail",
  async handle({
    data
  }: {
    data: { email: string; keyword: string; result: object };
  }) {
    const { email, keyword, result } = data;

    await Mail.sendMail({
      subject: "New alert for you",
      to: email,
      template: "alert",
      context: {
        keyword,
        result
      }
    }).catch((err: any) => console.log("Erro on send e-mail"));
  }
};
