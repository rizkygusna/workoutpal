import storage from '@/utils/storage';
import { Button } from './ui/button';

const Header = () => {
  const handleLogout = () => {
    storage.clearUser();
    storage.clearToken();
    window.location.assign('/');
  };

  return (
    <div className="max-w-screen-sm mx-auto mb-2">
      <div className="mx-4 flex justify-between py-4 sm:mx-0">
        <div className="flex flex-col justify-center">
          <h3 className="text-xl">WorkoutPal</h3>
        </div>
        <Button size="sm" onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
