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

const statuses = [
  { value: 'on-time', label: 'Вовремя' },
  { value: 'late', label: 'Опоздал' },
  { value: 'canceled', label: 'Отменен' }
];

const jobs = [
  { value: 'developer', label: 'Разработчик' },
  { value: 'designer', label: 'Дизайнер' },
  { value: 'manager', label: 'Менеджер' }
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

const MeetingsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    job: null,
    recruiter: null,
    candidate: null,
    expert: null,
    status: {
      recruiter: null,
      candidate: null,
      expert: null
    },
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
      setEvents(availableTimes.map(time => ({
        title: 'Available Time',
        start: new Date(time.startTime),
        end: new Date(time.endTime)
      })));
    }
  }, [selectedCandidate, selectedExpert, selectedRecruiter]);

  const handleReset = () => {
    setSelectedCandidate(null);
    setSelectedExpert(null);
    setSelectedRecruiter(null);
    setEvents(availableTimes.map(time => ({
      title: 'Available Time',
      start: new Date(time.startTime),
      end: new Date(time.endTime)
    })));
  };

  const handleSelectEvent = (event) => {
    setFormData({
      title: event.title,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
      job: jobs.find(job => job.value === event.job) || null,
      recruiter: users.find(user => user.value === event.recruiterId) || null,
      candidate: users.find(user => user.value === event.candidateId) || null,
      expert: users.find(user => user.value === event.expertId) || null,
      status: {
        recruiter: statuses.find(status => status.value === event.status?.recruiter) || null,
        candidate: statuses.find(status => status.value === event.status?.candidate) || null,
        expert: statuses.find(status => status.value === event.status?.expert) || null
      },
      comment: event.comment || ''
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

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData({
      ...formData,
      [name]: selectedOption
    });
  };

  const handleSave = () => {
    if (selectedEvent) {
      setEvents(events.map(event =>
        event === selectedEvent ? { ...selectedEvent, ...formData } : event
      ));
    } else {
      setEvents([...events, formData]);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    setEvents(events.filter(event => event !== selectedEvent));
    setShowModal(false);
  };

  const handleRemoveUser = (role) => {
    setFormData({
      ...formData,
      [role]: null,
      status: {
        ...formData.status,
        [role]: null
      }
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Страница митингов</h2>
      <div className="row mb-3">
        <div className="col-md-4">
          <h5>Выберите кандидата</h5>
          <Select
            value={selectedCandidate}
            onChange={setSelectedCandidate}
            options={users.filter(user => user.label.includes('кандидат'))}
            placeholder="Выберите кандидата"
          />
        </div>
        <div className="col-md-4">
          <h5>Выберите эксперта</h5>
          <Select
            value={selectedExpert}
            onChange={setSelectedExpert}
            options={users.filter(user => user.label.includes('эксперт'))}
            placeholder="Выберите эксперта"
          />
        </div>
        <div className="col-md-4">
          <h5>Выберите рекрутера</h5>
          <Select
            value={selectedRecruiter}
            onChange={setSelectedRecruiter}
            options={users.filter(user => user.label.includes('рекрутер'))}
            placeholder="Выберите рекрутера"
          />
        </div>
      </div>
      <div className="mb-3">
        <Button
          variant="secondary"
          onClick={handleReset}
        >
          Сброс
        </Button>
      </div>
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
        />
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="custom-width">
        <Modal.Header closeButton>
          <Modal.Title>Детали события</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Введите название события"
              />
            </Form.Group>
            <Form.Group controlId="formStart">
              <Form.Label>Время начала</Form.Label>
              <Form.Control
                type="datetime-local"
                name="start"
                value={formData.start.slice(0, -1)}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEnd">
              <Form.Label>Время окончания</Form.Label>
              <Form.Control
                type="datetime-local"
                name="end"
                value={formData.end.slice(0, -1)}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formJob">
              <Form.Label>Работа</Form.Label>
              <Select
                value={formData.job}
                onChange={handleSelectChange('job')}
                options={jobs}
              />
            </Form.Group>
            <Form.Group controlId="formRecruiter">
              <Form.Label>Рекрутер</Form.Label>
              <div className="d-flex align-items-center">
                <Select
                  value={formData.recruiter}
                  onChange={handleSelectChange('recruiter')}
                  options={users.filter(user => user.label.includes('рекрутер'))}
                  style={{ flex: 1 }}
                />
                <Select
                  value={formData.status.recruiter}
                  onChange={handleSelectChange('status.recruiter')}
                  options={statuses}
                  className="ml-2"
                  style={{ flex: 1 }}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveUser('recruiter')}
                  className="ml-2"
                >
                  🗑️
                </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="formCandidate">
              <Form.Label>Кандидат</Form.Label>
              <div className="d-flex align-items-center">
                <Select
                  value={formData.candidate}
                  onChange={handleSelectChange('candidate')}
                  options={users.filter(user => user.label.includes('кандидат'))}
                  style={{ flex: 1 }}
                />
                <Select
                  value={formData.status.candidate}
                  onChange={handleSelectChange('status.candidate')}
                  options={statuses}
                  className="ml-2"
                  style={{ flex: 1 }}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveUser('candidate')}
                  className="ml-2"
                >
                  🗑️
                </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="formExpert">
              <Form.Label>Эксперт</Form.Label>
              <div className="d-flex align-items-center">
                <Select
                  value={formData.expert}
                  onChange={handleSelectChange('expert')}
                  options={users.filter(user => user.label.includes('эксперт'))}
                  style={{ flex: 1 }}
                />
                <Select
                  value={formData.status.expert}
                  onChange={handleSelectChange('status.expert')}
                  options={statuses}
                  className="ml-2"
                  style={{ flex: 1 }}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveUser('expert')}
                  className="ml-2"
                >
                  🗑️
                </Button>
              </div>
            </Form.Group>
            <Form.Group controlId="formComment">
              <Form.Label>Комментарий</Form.Label>
              <Form.Control
                as="textarea"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={3}
                placeholder="Введите дополнительные комментарии"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>Отмена</Button>
          <Button variant="primary" onClick={handleSave}>Сохранить</Button>
          <Button variant="danger" onClick={handleDelete}>Удалить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MeetingsPage;
