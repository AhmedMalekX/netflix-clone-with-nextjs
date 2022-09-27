import { Magic } from "magic-sdk";

const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    // new Magic(process.env.NEXT_PUBLIC_MAGIN_PUBLISHABLE_API_KEY)
    new Magic('pk_live_5614236DD8A2A276')
  );
};

export const magic = createMagic();


