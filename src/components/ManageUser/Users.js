import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUser, deleteUser } from '../../services/UserService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const Users = (props) => {
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(6);
  const [totalPage, setTotalPage] = useState(0);

  // modal create
  const handleAddNewUser = () => {
    setActionModalUser('CREATE');
    setIsShowModalUser(true);
  };

  // modal delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModal, setDataModel] = useState({});

  // show modal user updata/create
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState('CREATE');

  // modal edit
  const [dataModalUser, setDataModelUser] = useState({});
  const handleEditUser = (user) => {
    setActionModalUser('UPDATE');
    setDataModelUser(user);
    setIsShowModalUser(true);
  };

  useEffect(() => {
    fetchUser();
  }, [currentPage]);

  const fetchUser = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    if (res && res.data && +res.data.EC === 0) {
      setTotalPage(res.data.DT.totalPage);
      setListUser(res.data.DT.users);
    }
  };

  // handle pagination
  const handlePageClick = async (event) => {
    setCurrentPage(event.selected + 1);
  };

  // handle delete user
  const handleDeleteUser = async (user) => {
    setDataModel(user);
    setIsShowModalDelete(true);
  };

  const handleClose = () => {
    setIsShowModalDelete(false);
    setDataModel({});
  };

  const confirmDeleteUser = async () => {
    let res = await deleteUser(dataModal);
    if (res && res.data && +res.data.EC === 0) {
      toast.success(res.data.EM);
      await fetchUser();
      setIsShowModalDelete(false);
    } else {
      toast.error(res.data.EM);
    }
  };

  // handle hide model user
  const onHideModelUser = async () => {
    setIsShowModalUser(false);
    setDataModelUser({});
    await fetchUser();
  };

  // handle refresh
  const handleRefresh = async () => {
    await fetchUser();
  };

  return (
    <>
      <div className="container">
        <div className="manage-user-container">
          <div className="user-header">
            <div className="title">
              <h3 className="my-3">Table Users</h3>
            </div>

            <div className="action">
              <button onClick={() => handleRefresh()} className="btn btn-success">
                <i className="fa fa-refresh"></i> Refresh
              </button>
              <button onClick={() => handleAddNewUser()} className="btn btn-primary mx-3">
                <i class="fa fa-plus-circle"></i> Add new user
              </button>
            </div>
          </div>

          <div className="user-body mt-3">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">ID</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Username</th>
                  <th scope="col">Sex</th>
                  <th scope="col">Group</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUser && listUser.length > 0 ? (
                  <>
                    {listUser.map((user, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                          <td>{user.id}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.username}</td>
                          <td>{user.sex}</td>
                          <td>{user.Group ? user.Group.name : ''}</td>
                          <td>
                            <span title="Edit" className="btn btn-warning mx-2" onClick={() => handleEditUser(user)}>
                              <i class="fa fa-pencil-square-o"></i>
                            </span>
                            <span title="Delete" onClick={() => handleDeleteUser(user)} className="btn btn-danger">
                              <i class="fa fa-trash-o"></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="text-center" colSpan={5}>
                        Not found user
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {totalPage > 0 && (
            <div className="user-footer">
              <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>

      <ModalDelete show={isShowModalDelete} handleClose={handleClose} confirmDeleteUser={confirmDeleteUser} dataModal={dataModal} />
      <ModalUser onHide={onHideModelUser} show={isShowModalUser} action={actionModalUser} dataModalUser={dataModalUser} />
    </>
  );
};

export default Users;
