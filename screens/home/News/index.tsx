import { Grid } from "@chakra-ui/react";
import { gridProps } from "app/styles/constants";

const skeleton = {
	title: "Carta Mensal: Fevereiro",
	author: "Daniel Perdomo",
	date: new Date(),
	excerpt:
		"Como citado, em cartas anteriores, gosto de clichês já que são muito úteis para simplificar a explicação de temas complexos. Portanto, para os objetivos desta comunicação, utilizarei mais um (com a devida licença poética e adaptação): investir é uma maratona e não uma corrida de cem metros, é muito mais sobre resistência do que velocidade.",
};
const skeletons = new Array(7).fill("").map(() => skeleton);

const News: React.FC = () => {
	return <Grid {...gridProps}></Grid>;
};

export default News;
