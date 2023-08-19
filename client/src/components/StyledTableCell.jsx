import { styled, TableCell, tebleCellClasses } from '@mui/material';

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  [`&.${tebleCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tebleCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableCell = ({ children }) => {
  return <TableCellStyled>{children}</TableCellStyled>;
};

export default StyledTableCell;
