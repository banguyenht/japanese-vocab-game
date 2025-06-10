export default function LoadingScreen({ message = "Đang tải từ vựng..." }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500 text-xl">{message}</p>
    </div>
  );
}
