import Input from "@components/Input";
import SimpleCard from "@components/SimpleCard";

function Home() {
    return(
      <div>
        <SimpleCard
          title="João Santos Gomes"
          subtitle="123.456.789-01"
          info="Info"
        />
        <Input tamanho="M" placeholder="26/02/2024"/>
      </div>
    )
  }
  
  export default Home;
  