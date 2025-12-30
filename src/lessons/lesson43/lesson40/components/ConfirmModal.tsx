type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({ open, onCancel, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div style={{ background: "rgba(0,0,0,0.4)", padding: 20 }}>
      <div style={{ background: "#fff", padding: 16 }}>
        <p>Are you sure you want to clear all todos?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
}
