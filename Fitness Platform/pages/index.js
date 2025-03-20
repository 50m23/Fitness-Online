import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FitnessPlatform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([
    { email: "user1@example.com", access: false },
    { email: "user2@example.com", access: false }
  ]);
  const [videos, setVideos] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCategory, setVideoCategory] = useState("general");
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (email === "admin@trainer.com" && password === "admin123") {
      setIsAdmin(true);
    } else {
      setIsLoggedIn(true);
    }
  };

  const addVideo = () => {
    if (videoTitle && videoUrl) {
      setVideos([...videos, { title: videoTitle, url: videoUrl, category: videoCategory }]);
      setVideoTitle("");
      setVideoUrl("");
      setVideoCategory("general");
    }
  };

  const addComment = (videoIndex, text) => {
    setComments((prevComments) => ({
      ...prevComments,
      [videoIndex]: [...(prevComments[videoIndex] || []), text]
    }));
  };

  const toggleLike = (videoIndex) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [videoIndex]: (prevLikes[videoIndex] || 0) + 1
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Онлайн-фитнес платформа</h1>
      {!isLoggedIn ? (
        <Tabs defaultValue="login">
          <TabsList className="flex justify-center bg-white p-2 rounded-lg shadow-md">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="signup">Регистрация</TabsTrigger>
            <TabsTrigger value="reset">Сброс пароля</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card className="shadow-md">
              <CardContent className="p-6 space-y-4">
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600" onClick={handleLogin}>Войти</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Доступные тренировки</h2>
          <Select onValueChange={setVideoCategory}>
            <SelectTrigger className="w-full mt-2 border-gray-300 shadow-sm">
              <SelectValue placeholder="Выберите категорию" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Общие</SelectItem>
              <SelectItem value="yoga">Йога</SelectItem>
              <SelectItem value="strength">Силовые</SelectItem>
            </SelectContent>
          </Select>
          <ul className="mt-4">
            {videos.filter(video => video.category === videoCategory).map((video, index) => (
              <li key={index} className="p-4 border-b bg-gray-50 rounded-lg shadow-sm mt-4">
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 font-semibold hover:underline">{video.title}</a>
                <div className="mt-2 flex items-center space-x-2">
                  <Button onClick={() => toggleLike(index)} className="bg-green-500 text-white hover:bg-green-600">👍 {likes[index] || 0}</Button>
                  <Textarea placeholder="Добавить комментарий..." className="w-full border-gray-300 shadow-sm" onBlur={(e) => addComment(index, e.target.value)} />
                </div>
                <ul className="mt-2 text-gray-600">
                  {(comments[index] || []).map((comment, i) => (
                    <li key={i} className="text-sm bg-gray-200 p-2 rounded-lg mt-1">{comment}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
