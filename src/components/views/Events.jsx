import {Card, CardContainer} from '../UI/Card.jsx';
import './Events.scss';

function Events() {
  const eventlist = [
    {
      EventID: 1,
      EventName: "Summer Tech Conference",
      Description: "Annual technology conference featuring the latest innovations",
      Date: "2025-07-15",
      EventImageURL: "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg"
    },
    {
      EventID: 2,
      EventName: "Project Showcase",
      Description: "Student projects presentation and networking event",
      Date: "2025-08-20",
      EventImageURL: "https://images.freeimages.com/images/small-previews/411/light-of-technology-1510575.jpg"
    },
    {
      EventID: 3,
      EventName: "Web Dev Workshop",
      Description: "Hands-on workshop for modern web development",
      Date: "2025-09-05",
      EventImageURL: "https://images.freeimages.com/images/small-previews/64b/vla-1-1315506.jpg"
    },
    {
      EventID: 4,
      EventName: "Data Science Summit",
      Description: "Expert talks on advanced data analysis techniques",
      Date: "2025-09-15",
      EventImageURL: "https://images.freeimages.com/images/small-previews/293/cable-4-1243085.jpg"
    },
    {
      EventID: 5,
      EventName: "Cybersecurity Conference",
      Description: "Latest trends in cybersecurity and defense",
      Date: "2025-10-01",
      EventImageURL: "https://images.freeimages.com/images/small-previews/fa1/cable-5-1243077.jpg"
    }
  ];

  return(
    <>
    <h1>Events</h1>
        <CardContainer>
          {
            eventlist.map((event)=>{
              return (
                <div className="eventCard" key={event.EventID}>
                  <Card>
                    <h3>{event.EventName}</h3>
                    <p>{event.Description}</p>
                    <p>Date: {new Date(event.Date).toLocaleDateString()}</p>
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