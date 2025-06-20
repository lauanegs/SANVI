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

function Especialistas() {
	const novoEspecialistaRef = useRef<any>(null);

	const [searchTerm, setSearchTerm] = useState("");

	const [tabEspecialista, setTabEspecialista] = useState(false);
	const [especialistas, setEspecialistas] = useState<Specialist[]>([]);

	useEffect(() => {
		getAllSpecialists().then(setEspecialistas);
	}, []);

	const handleSaveAndClose = async () => {
		if (novoEspecialistaRef.current?.handleSave) {
			const result = await novoEspecialistaRef.current.handleSave();

			if (result) {
				setTabEspecialista(false);
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
			{!tabEspecialista ? (
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
							onClick={() => setTabEspecialista(true)}
						/>
					</div>

					<div className={s.Esp_body}>
						<div className={s.grid_container}>
							{filteredEspecialistas.map((e) => (
								<div className={s.card} key={e.id}>
									<SimpleCard
										title={e.name}
										subtitle={e.CPF}
										info={e.specialistType}
									/>
								</div>
							))}
						</div>
					</div>
				</>
			) : (
				<>
					<GenericHeader />
					<div className={s.esp_headerContainer}>
						<div className={s.esp_cadastroTab}>Cadastro</div>
						<div className={s.esp_headerButtons}>
							<GenericButton
								color="SECONDARY"
								title="Voltar"
								onClick={() => setTabEspecialista(false)}
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
			)}
		</div>
	);
}

export default Especialistas;
