import CardSimples from "@components/CardSimples/CardSimples";
import Input from "@components/Input/Input";

function Home() {
    return(
      <div>

        <CardSimples titulo="João Santos Gomes" subtitulo="123.456.789-01" texto="Info"/>
        <Input tamanho="M" placeholder="26/02/2024"/>
      </div>
    )
  }
  
  export default Home;
  