import styled from "@emotion/styled"

type GridProp = {
    size?: number,
    grow?: number
}
export const Button = styled.button`
	/* border: 1px solid green;
	color: turquoise; */
`
export const Grid = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    height: 100%;
    width: 100%;
	/*border: 4px solid black;*/
`
export const Row = styled.div<GridProp>`
	display: flex;
	border: 1px solid blue;
    flex-grow: ${(props) => props?.grow};
`
export const Col = styled.div<GridProp>`
	flex: ${(props) => props?.size};
    margin: auto;
	border: 2px solid red;
`