import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

// Устанавливаем локализатор для компонента Calendar
const localizer = momentLocalizer(moment);

// Начальные события для календаря
const testEvents = [
  {
    title: 'Свободное время',
    start: new Date(2024, 7, 10, 10, 0),
    end: new Date(2024, 7, 10, 11, 0),
  },
  {
    title: 'Свободное время',
    start: new Date(2024, 7, 11, 14, 0),
    end: new Date(2024, 7, 11, 15, 0),
  },
  {
    title: 'Свободное время',
    start: new Date(2024, 7, 12, 9, 0),
    end: new Date(2024, 7, 12, 10, 0),
  },
];

const MyCalendar = () => {
  // Состояния для управления событиями и модальными окнами
  const [events, setEvents] = useState(testEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [selectedEventToDelete, setSelectedEventToDelete] = useState(null);

  // Обработка выбора слота (когда пользователь кликает на пустое место в календаре)
  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ start, end, title: '' });
    setShowAddModal(true); // Показать модальное окно для добавления события
  };

  // Обработка выбора события (когда пользователь кликает на существующее событие)
  const handleSelectEvent = (event) => {
    setSelectedEventToDelete(event);
    setShowDeleteModal(true); // Показать модальное окно для удаления события
  };

  // Добавление нового события в календарь
  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent, title: newEvent.title }]);
    setShowAddModal(false); // Закрыть модальное окно для добавления события
  };

  // Удаление выбранного события из календаря
  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e !== selectedEventToDelete));
    setShowDeleteModal(false); // Закрыть модальное окно для удаления события
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Мой Календарь</h2>
      <div className="row">
        <div className="col-md-12" style={{ height: '600px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            selectable
            style={{ height: '100%' }}
          />
        </div>
      </div>

      {/* Модальное окно для добавления события */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить событие</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Название события</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="Введите название события"
              />
            </Form.Group>
            <Form.Group controlId="formEventStart">
              <Form.Label>Время начала</Form.Label>
              <Form.Control
                type="datetime-local"
                value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
              />
            </Form.Group>
            <Form.Group controlId="formEventEnd">
              <Form.Label>Время окончания</Form.Label>
              <Form.Control
                type="datetime-local"
                value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
                onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Модальное окно для удаления события */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить событие</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Вы действительно хотите удалить это событие?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleDeleteEvent}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyCalendar;
