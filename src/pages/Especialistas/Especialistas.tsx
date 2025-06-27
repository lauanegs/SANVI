import { useEffect, useState } from "react";
import { GenericHeader } from "@components/GenericHeader";
import SimpleCard from "@components/SimpleCard";
import GenericButton from "@components/GenericButton";
import { NovoEspecialista } from "@components/NovoEspecialista";
import s from "./Especialista.module.css";
import theme from "theme";
import { Specialist } from "lib/types";
import { getAllSpecialists } from "@api/specialist/getAll";

import { useRef } from "react";
import SearchInput from "@components/search";
import { EditarEspecialista } from "@components/EditarEspecialista";

function Especialistas() {
	const novoEspecialistaRef = useRef<any>(null);
	const [selectedSpecialist, setSelectedSpecialist] =
		useState<Specialist | null>(null);

	const editarEspecialistaRef = useRef<any>(null);

	const [tabEspecialista, setTabEspecialista] = useState<"lista" | "novo">(
		"lista"
	);

	const [searchTerm, setSearchTerm] = useState("");

	//const [tabEspecialista, setTabEspecialista] = useState(false);
	const [especialistas, setEspecialistas] = useState<Specialist[]>([]);

	useEffect(() => {
		getAllSpecialists().then(setEspecialistas);
	}, []);

	const handleSaveAndClose = async () => {
		if (novoEspecialistaRef.current?.handleSave) {
			const result = await novoEspecialistaRef.current.handleSave();

			if (result) {
				setTabEspecialista("lista");
				const novos = await getAllSpecialists();
				setEspecialistas(novos);
			}
		}
	};

	const filteredEspecialistas = especialistas.filter((e) =>
		e.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div
			className={s.Esp_container}
			style={{ backgroundColor: theme.COLORS.FUMACA_BRANCA }}
		>
			{tabEspecialista == "lista" ? (
				<>
					<GenericHeader />
					<div className={s.esp_headerContainer}>
						<SearchInput
							Label="Especialista: "
							labelHorizontal={true}
							onChange={(value) => setSearchTerm(value)}
							value={searchTerm}
							placeholder="Digite o nome do Especialista"
						/>
						<GenericButton
							color="PRIMARY"
							title="Novo Especialista"
							onClick={() => setTabEspecialista("novo")}
						/>
					</div>

					<div className={s.Esp_body}>
						<div className={s.grid_container}>
							{filteredEspecialistas.map((e) => (
								<div className={s.card} key={e.id}>
									<SimpleCard
										title={e.name}
										subtitle={e.specialistType}
										onClick={() => {
											setSelectedSpecialist(e);
										}}
									/>
								</div>
							))}
						</div>
					</div>
				</>
			) : tabEspecialista == "novo" ? (
				<>
					<GenericHeader />
					<div className={s.esp_headerContainer}>
						<div className={s.esp_cadastroTab}>Cadastro</div>
						<div className={s.esp_headerButtons}>
							<GenericButton
								color="SECONDARY"
								title="Voltar"
								onClick={() => setTabEspecialista("lista")}
							/>

							<GenericButton
								title="Salvar"
								color="PRIMARY"
								onClick={handleSaveAndClose}
							/>
						</div>
					</div>
					<NovoEspecialista ref={novoEspecialistaRef} />
				</>
			) : undefined}
		</div>
	);
}

export default Especialistas;
