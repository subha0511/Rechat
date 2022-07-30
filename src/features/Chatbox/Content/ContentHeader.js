import Avatar from "@mui/material/Avatar";
import { useRoom } from "../../../context/RoomContext";

function ContentHeader() {
  const { activeRoom } = useRoom();
  return (
    <div className="header chat-header">
      <>
        {activeRoom && (
          <>
            <Avatar className="header-avatar">
              {activeRoom.name ? activeRoom.name.substring(0, 1) : ""}
            </Avatar>
            <div className="chat-details">
              <div className="grid-line">
                <p className="chat-title">{activeRoom.name}</p>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default ContentHeader;
