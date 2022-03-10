import React from "react";
import { Footer, Stats, Hero, Navbar, SEO } from "../../components";
function Home() {
  return (
    <React.Fragment>
      <SEO title="Home" />
      <Navbar />
      <Hero />
      <Stats />
      <Footer />
    </React.Fragment>
  );
}

export default Home;
