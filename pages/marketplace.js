import React from 'react';
import { Layout } from "@components/Layout";
import { Button } from "@components/components/ui/Button";
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <h1>Marketplace Demo</h1>
      <Button
      onClick={() => {
        router.push('/playground');
      }}
      >Back to Playground</Button>
    </Layout>
  );
}
