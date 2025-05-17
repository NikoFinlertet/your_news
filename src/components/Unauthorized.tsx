import { Header } from "@/components/Header";

export default async function Unauthorized() {
    return(
      <>
        <Header/>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-2xl">unauthorized</p>
      </div>
      </>
    );
  }