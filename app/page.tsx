import { Header } from "./components/Header";
import { Hero } from "./components/Hero";

const Home = () => {
    return (
        <main className="flex mi-h-screen flex-col">
            <Header />
            <Hero />
        </main>
    );
}

export default Home;