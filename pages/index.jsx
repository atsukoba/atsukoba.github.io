import React from "react";
import matter from "gray-matter";
import Link from "next/link";
import Container from "../components/Container";
import MeSketch from "../components/MeSketch";

const Index = () => {
  return (
    <Container>
      <MeSketch width={300} height={500} />
    </Container>
  );
};

export default Index;
