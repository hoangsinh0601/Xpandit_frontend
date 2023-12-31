import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteEmployees,
  useHardDeleteEmployees,
  useRestoreEmployees,
  useUpdateEmployees,
} from "../../../data/mutation/home/home-mutation";
import FormDialog from "../../atoms/form/form";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { EmployeesEntity, FormType } from "../../../data/query/home/home-query";
import dayjs from "dayjs";
import { SidebarType } from "../sidebar/Sidebar";
import { Avatar } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

interface ListProps {
  listData: EmployeesEntity[];
  type: SidebarType;
}

const List = (props: ListProps) => {
  const { listData, type } = props;
  const { mutateAsync: deleteMutate } = useDeleteEmployees();
  const { mutateAsync: updateMutate } = useUpdateEmployees();
  const { mutateAsync: hardDeleteMutate } = useHardDeleteEmployees();
  const { mutateAsync: restoreMutate } = useRestoreEmployees();

  const handleDeleteEmployees = async (id: string) => {
    try {
      const response = await deleteMutate(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleHardDeleteEmployees = async (id: string) => {
    try {
      const response = await hardDeleteMutate(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRestoreEmployees = async (id: string) => {
    try {
      const response = await restoreMutate(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateEmployees = async (employeesParams: EmployeesEntity) => {
    try {
      console.log(employeesParams);
      const response = await updateMutate(employeesParams);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {(type === SidebarType.employees || type === SidebarType.bin) && (
              <TableCell className="tableCell">User ID</TableCell>
            )}
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Working date</TableCell>
            <TableCell className="tableCell">Date off</TableCell>
            <TableCell className="tableCell">Salary per day</TableCell>
            {type == SidebarType.salary && (
              <TableCell className="tableCell">Total Salary</TableCell>
            )}
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listData.map((item) => (
            <TableRow key={item._id}>
              {(type === SidebarType.employees || type === SidebarType.bin) && (
                <TableCell className="tableCell">{item._id}</TableCell>
              )}
              <TableCell className="tableCell">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={item.avatar?.key}
                    src={item.avatar?.url}
                    style={{ marginRight: 10 }}
                  />
                  <div>{item.name}</div>
                </div>
              </TableCell>
              <TableCell className="tableCell">{item.email}</TableCell>
              <TableCell className="tableCell">
                {dayjs(new Date(item.date)).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell className="tableCell">{item.working_date}</TableCell>
              <TableCell className="tableCell">{item.date_off}</TableCell>
              <TableCell className="tableCell">
                {item.salary_per_date}
              </TableCell>
              {type == SidebarType.salary && (
                <TableCell className="tableCell">
                  {item.salary_per_date * item.working_date}
                </TableCell>
              )}
              <TableCell className="tableCell">
                <span className={`status ${item.status}`}>{item.status}</span>
              </TableCell>

              {type === SidebarType.employees && (
                <TableCell className="tableCell">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (item._id) {
                        handleDeleteEmployees(item._id);
                      }
                    }}
                    style={{ marginBottom: 5 }}
                  >
                    <DeleteIcon />
                  </Button>
                  <FormDialog
                    type={FormType.change}
                    getValue={(e) => {
                      handleUpdateEmployees(e);
                    }}
                    value={item}
                  >
                    <EditIcon />
                  </FormDialog>
                </TableCell>
              )}
              {type === SidebarType.bin && (
                <TableCell className="tableCell">
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (item._id) {
                        handleHardDeleteEmployees(item._id);
                      }
                    }}
                    style={{
                      marginBottom: 5,
                      color: "red",
                      border: "1px solid red",
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      if (item._id) {
                        handleRestoreEmployees(item._id);
                      }
                    }}
                  >
                    <AutorenewIcon />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
