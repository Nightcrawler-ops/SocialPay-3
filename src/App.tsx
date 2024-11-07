import { useState } from 'react';
import { Home, MessageSquare, Users, Bell, Settings, Send, Sun, Moon, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ThemeProvider } from '@/components/theme-provider';
import { PostCard } from '@/components/post-card';
import { ProfileHeader } from '@/components/profile-header';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from '@/components/theme-provider';
import type { Post, User } from '@/lib/types';

type Page = 'home' | 'chat' | 'friends' | 'notifications' | 'settings' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { theme, setTheme } = useTheme();

  const currentUser: User = {
    id: 1,
    name: 'Oluwaseun Adebayo',
    username: 'seun_pay',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&auto=format',
    balance: 250000,
    email: 'seun@example.com',
    bio: 'Digital payments enthusiast | Building the future of social payments in Nigeria 🇳🇬',
    followers: 1234,
    following: 567,
  };

  const posts: Post[] = [
    {
      id: 1,
      user: {
        name: 'Chioma Okonkwo',
        username: 'chioma_fintech',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop&auto=format',
      },
      content: 'Just completed my first international transfer using SocialPay! The future of payments is social 🚀',
      likes: 245,
      comments: 23,
      reposts: 12,
      timestamp: '2h ago',
      liked: false,
      reposted: false,
    },
    {
      id: 2,
      user: {
        name: 'Babajide Ogunleye',
        username: 'baj_payments',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop&auto=format',
      },
      content: 'Check out my new store setup! Now accepting payments through SocialPay 🏪',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&fit=crop&auto=format',
      likes: 567,
      comments: 45,
      reposts: 89,
      timestamp: '4h ago',
      liked: true,
      reposted: false,
    },
  ];

  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [repostedPosts, setRepostedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleRepost = (postId: number) => {
    setRepostedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="max-w-2xl mx-auto p-4">
            <div className="mb-6">
              <Input
                placeholder="What's on your mind?"
                className="mb-2"
              />
              <div className="flex justify-end">
                <Button>Post</Button>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onRepost={handleRepost}
                />
              ))}
            </ScrollArea>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto p-4">
            <ProfileHeader
              user={currentUser}
              onEdit={() => {}}
              onDeposit={() => {}}
            />
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onRepost={handleRepost}
                />
              ))}
            </ScrollArea>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                <div className="flex items-center justify-between">
                  <span>Theme</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {theme === 'light' && <Sun className="h-4 w-4 mr-2" />}
                        {theme === 'dark' && <Moon className="h-4 w-4 mr-2" />}
                        {theme === 'system' && <Laptop className="h-4 w-4 mr-2" />}
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setTheme('light')}>
                        <Sun className="h-4 w-4 mr-2" /> Light
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('dark')}>
                        <Moon className="h-4 w-4 mr-2" /> Dark
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('system')}>
                        <Laptop className="h-4 w-4 mr-2" /> System
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email Notifications</label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Receive payment notifications</span>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Security</label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Two-factor authentication</span>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Privacy</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Account Visibility</label>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-muted-foreground">Make account private</span>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="socialpay-theme">
      <div className="flex h-screen bg-background">
        <div className="w-16 border-r flex flex-col items-center py-4 space-y-4">
          <Button
            variant={currentPage === 'home' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setCurrentPage('home')}
          >
            <Home className="h-5 w-5" />
          </Button>
          <Button
            variant={currentPage === 'profile' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setCurrentPage('profile')}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
          </Button>
          <Button
            variant={currentPage === 'chat' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setCurrentPage('chat')}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant={currentPage === 'friends' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setCurrentPage('friends')}
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant={currentPage === 'notifications' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setCurrentPage('notifications')}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant={currentPage === 'settings' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setCurrentPage('settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <main className="flex-1 overflow-hidden">{renderPage()}</main>
      </div>
    </ThemeProvider>
  );
}

export default App;