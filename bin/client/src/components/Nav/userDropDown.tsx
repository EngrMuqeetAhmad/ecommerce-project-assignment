import { FC, useContext } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { UserOutput } from '../../types';
import { UserServices } from '../../services/user.service';
import { UserContext } from '../../state/user/user.context';
import { ActionType } from '../../state/user/user.actions';
import { useNavigate } from 'react-router-dom';

export const UserDropDown: FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const user: UserOutput | null = JSON.parse(`${localStorage.getItem('user')}`);
  const Logout = () => {
    UserServices.Logout();
    dispatch({
      type: ActionType.LOGOUT,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
  };
  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        key="down-centered"
        id="down-centered"
        drop="down-centered"
        variant="secondary"
        title="Settings"
        className="text-capitalize"
      >
        <Dropdown.Item>
          Hello {user?.firstName} <i className="fas fa-kiss-beam"></i>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            navigate('/wishes');
          }}
        >
          Wishes
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            navigate('/me');
          }}
        >
          Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={Logout} className="text-danger">
          LogOut <i className="fas fa-sign-out-alt"></i>{' '}
        </Dropdown.Item>
      </DropdownButton>
    </>
  );
};
