import styled from "@emotion/styled"

type GridProps = {
    size?: number,
    grow?: number,
    bg?: string,
    direction?: string,
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
export const Row = styled.div<GridProps>`
border: 1px solid blue;
display:flex;
flex-direction:${(props) => props?.direction};
flex-grow: ${(props) => props?.grow};
flex: ${(props) => props?.size};
background-color:${(props) => props?.bg}; 
`
export const Col = styled.span<GridProps>`
	flex: ${(props) => props?.size};
    background-color:${(props) => props?.bg};
    flex-grow: ${(props) => props?.grow}; 
    margin: auto;
	border: 2px solid red;
`