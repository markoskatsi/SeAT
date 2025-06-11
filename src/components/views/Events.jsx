import {Card, CardContainer} from '../UI/Card.jsx';
import useLoad from '../../API/useLoad.js';
import API_ENDPOINTS from '../../API/API_ENDPOINTS.js';
import './Events.scss';

function Events() {
  const [event, setEvent, isLoading, loadEvent] = useLoad(API_ENDPOINTS.EVENTS);

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  return(
    <>
    <h1>Events</h1>
        <CardContainer>
          {
            event.map((event)=>{
              return (
                <div className="eventCard" key={event.EventID}>
                  <Card>
                    <h3>{event.EventName}</h3>
                    <p>{event.Description}</p>
                    <p>Date: {new Date(event.Date).toLocaleDateString()}</p>
                    <p>Location: {event.EventLocationName}</p>
                    <img src={event.EventImageURL} alt={event.EventName}/>
                  </Card>
                </div>
              )
            })
          }
        </CardContainer>
    </>
  );
}

export default Events;