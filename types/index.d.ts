declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      DATABASE_URL: string;
      CLOUDINARY_CLOUD_NAME?: string;
      CLOUDINARY_API_KEY?: string;
      CLOUDINARY_API_SECRET?: string;
      OPENAI_API_KEY?: string;
      ANTHROPIC_API_KEY?: string;
    }
  }

  type AppUser = {
    id: string;
    email: string;
    name?: string;
  };

  type GeneratedForm = {
    title: string;
    fields: Array<{
      id: string;
      label: string;
      type: string;
      required: boolean;
    }>;
    pdfUrl?: string;
  };
}

export { };
