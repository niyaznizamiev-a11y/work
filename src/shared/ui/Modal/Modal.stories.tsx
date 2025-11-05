import type { Meta, StoryObj } from '../../../../node_modules/@storybook/react/dist/index';
import { useState } from 'react';
import { Modal } from './Modal';

const ModalWithButton = () => {
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
          <p>Это содержимое модального окна</p>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setIsOpen(false)}
          >
            Закрыть
          </button>
        </div>
      </Modal>
    </div>
  );
};

const meta = {
  title: 'Shared/Modal',
  component: ModalWithButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ModalWithButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};