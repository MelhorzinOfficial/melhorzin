import emailjs from "@emailjs/browser";

interface EmailForm {
  name: string;
  email: string;
  message: string;
}

const sendEmail = async (formData: EmailForm): Promise<{ success: boolean; message: string }> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;

  if (!serviceId || !templateId || !publicKey) {
    console.error("Variáveis de ambiente não foram carregadas corretamente.");
    return { success: false, message: "Erro na configuração das variáveis de ambiente." };
  }

  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      { ...formData },
      publicKey
    );

    console.log("Email enviado com sucesso:", response);
    return { success: true, message: "Email enviado com sucesso!" };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, message: "Erro ao enviar email." };
  }
};

export default sendEmail;