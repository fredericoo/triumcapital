import { Document } from "prismic-javascript/types/documents";
import { Container, HStack, Box, Button } from "@chakra-ui/react";
import DocLink from "../DocLink";
import Logo from "./Logo";
import { ArrowTopRight } from "../Icon";

interface MenuItem {
	label: string;
	document: Document;
}

type NavbarProps = {
	menu?: MenuItem[];
};
const Navbar: React.FC<NavbarProps> = ({ menu }) => (
	<Box position="sticky" top={0} bg="white" zIndex="sticky" boxShadow="sm">
		<Container maxW="container.lg">
			<HStack spacing={4} py={3}>
				<Box>
					<Logo />
				</Box>
				<Box flexGrow={1} as="ul">
					Serviços Equipe Artigos Contato
					{menu &&
						menu.map(({ label, document }) => (
							<li>
								<DocLink doc={document}>{label}</DocLink>
							</li>
						))}
				</Box>
				<Button variant="outline" size="sm" rightIcon={ArrowTopRight}>
					Invista
				</Button>
			</HStack>
		</Container>
	</Box>
);

export default Navbar;
