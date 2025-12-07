export default function Loading() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#0a0000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      color: '#DC143C',
      fontFamily: 'Cinzel, serif'
    }}>
      <div>Loading...</div>
    </div>
  );
}
