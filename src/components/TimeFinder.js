import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт стилей Bootstrap
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const users = [
  { value: 1, label: 'Иван Иванов (кандидат)' },
  { value: 2, label: 'Петр Петров (эксперт)' },
  { value: 3, label: 'Сидор Сидоров (рекрутер)' },
  { value: 4, label: 'Александр Александров (кандидат)' },
  { value: 5, label: 'Елена Еленова (эксперт)' },
  { value: 6, label: 'Мария Иванова (рекрутер)' },
  { value: 7, label: 'Юрий Юрьев (кандидат)' },
  { value: 8, label: 'Ольга Сидорова (эксперт)' }
];

const availableTimes = [
  { userId: 1, startTime: '2024-08-09T09:00:00Z', endTime: '2024-08-09T12:00:00Z' },
  { userId: 2, startTime: '2024-08-09T10:00:00Z', endTime: '2024-08-09T13:00:00Z' },
  { userId: 3, startTime: '2024-08-09T09:30:00Z', endTime: '2024-08-09T11:00:00Z' },
  { userId: 4, startTime: '2024-08-09T11:00:00Z', endTime: '2024-08-09T14:00:00Z' },
  { userId: 5, startTime: '2024-08-09T10:30:00Z', endTime: '2024-08-09T12:30:00Z' },
  { userId: 6, startTime: '2024-08-09T09:00:00Z', endTime: '2024-08-09T11:30:00Z' },
  { userId: 7, startTime: '2024-08-09T13:00:00Z', endTime: '2024-08-09T15:00:00Z' },
  { userId: 8, startTime: '2024-08-09T09:00:00Z', endTime: '2024-08-09T10:00:00Z' }
];

const findIntersections = (times) => {
  let result = [];
  if (times.length > 0) {
    let start = new Date(times[0].startTime);
    let end = new Date(times[0].endTime);

    times.forEach(time => {
      let timeStart = new Date(time.startTime);
      let timeEnd = new Date(time.endTime);

      if (timeStart > start) start = timeStart;
      if (timeEnd < end) end = timeEnd;
    });

    if (start < end) {
      result.push({
        title: 'Available Time',
        start: start,
        end: end
      });
    }
  }

  return result;
};

const TimeFinder = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    job: '',
    comment: ''
  });

  useEffect(() => {
    const userIds = [
      selectedCandidate?.value,
      selectedExpert?.value,
      selectedRecruiter?.value
    ].filter(Boolean);

    if (userIds.length > 0) {
      const times = availableTimes.filter(time => userIds.includes(time.userId));
      const intersections = findIntersections(times);
      setEvents(intersections);
    } else {
      setEvents([]);
    }
  }, [selectedCandidate, selectedExpert, selectedRecruiter]);

  const handleSelectSlot = ({ start, end }) => {
    setFormData({
      title: '',
      start: start.toISOString(),
      end: end.toISOString(),
      job: '',
      comment: ''
    });
    setSelectedEvent(null);
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setFormData({
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      job: '',
      comment: ''
    });
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Сохранение данных
    if (selectedEvent) {
      // Обновление существующего события
      setEvents(events.map(event =>
        event === selectedEvent ? { ...selectedEvent, ...formData } : event
      ));
    } else {
      // Создание нового события
      setEvents([...events, formData]);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Find Common Available Time</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <h5>Select Candidate</h5>
          <Select
            value={selectedCandidate}
            onChange={setSelectedCandidate}
            options={users.filter(user => user.label.includes('кандидат'))}
            placeholder="Choose a candidate"
          />
        </div>
        <div className="col-md-4">
          <h5>Select Expert</h5>
          <Select
            value={selectedExpert}
            onChange={setSelectedExpert}
            options={users.filter(user => user.label.includes('эксперт'))}
            placeholder="Choose an expert"
          />
        </div>
        <div className="col-md-4">
          <h5>Select Recruiter</h5>
          <Select
            value={selectedRecruiter}
            onChange={setSelectedRecruiter}
            options={users.filter(user => user.label.includes('рекрутер'))}
            placeholder="Choose a recruiter"
          />
        </div>
      </div>
      <div className="mb-3">
        <Button
          variant="secondary"
          onClick={() => {
            setSelectedCandidate(null);
            setSelectedExpert(null);
            setSelectedRecruiter(null);
            setEvents([]);
          }}
        >
          Reset
        </Button>
      </div>
      <div style={{ height: '600px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? 'Edit Event' : 'Add Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formStart">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start"
                value={formData.start.slice(0, 16)}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEnd">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end"
                value={formData.end.slice(0, 16)}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formJob">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job title"
                name="job"
                value={formData.job}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter comments"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TimeFinder;
