import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        Открыть модалку
      </button>
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Пример модалки"
      >
        <div className="space-y-4">
          <p>Это содержимое модального окна. Вы можете разместить здесь любой контент.</p>
          <div className="flex gap-2">
            <button 
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => alert('Действие выполнено!')}
            >
              Подтвердить
            </button>
            <button 
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const meta = {
  title: 'Shared/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen', // Модалка лучше смотрится на полном экране
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
    title: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Демо-стори с кнопкой для открытия
export const Demo: StoryObj = {
  render: () => <ModalDemo />,
};

// Базовые стори для разных состояний
export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Заголовок модалки',
    children: (
      <div>
        <p>Содержимое модального окна. Это пример текста.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
          Кнопка внутри
        </button>
      </div>
    ),
    onClose: () => console.log('Модалка закрыта'),
  },
};

export const LongContent: Story = {
  args: {
    isOpen: true,
    title: 'Модалка с длинным содержимым',
    children: (
      <div className="space-y-4">
        <p>Это модальное окно с большим количеством контента.</p>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>Параграф текста номер {i + 1}</p>
        ))}
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Принять
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Отклонить
          </button>
        </div>
      </div>
    ),
    onClose: () => console.log('Модалка закрыта'),
  },
};