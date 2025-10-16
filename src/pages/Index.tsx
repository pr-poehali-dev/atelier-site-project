import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');

  const services = [
    { id: 'hem', name: 'Подшив изделия', basePrice: 500 },
    { id: 'resize', name: 'Ушить/расширить', basePrice: 1200 },
    { id: 'zipper', name: 'Замена молнии', basePrice: 800 },
    { id: 'repair', name: 'Ремонт одежды', basePrice: 600 },
    { id: 'custom', name: 'Пошив на заказ', basePrice: 3500 },
  ];

  const materials = [
    { id: 'cotton', name: 'Хлопок', multiplier: 1.0 },
    { id: 'wool', name: 'Шерсть', multiplier: 1.3 },
    { id: 'silk', name: 'Шёлк', multiplier: 1.5 },
    { id: 'leather', name: 'Кожа', multiplier: 1.8 },
  ];

  const complexity = [
    { id: 'simple', name: 'Простая', multiplier: 1.0 },
    { id: 'medium', name: 'Средняя', multiplier: 1.3 },
    { id: 'complex', name: 'Сложная', multiplier: 1.6 },
  ];

  const calculatePrice = () => {
    if (!selectedService || !selectedMaterial || !selectedComplexity) return 0;
    
    const service = services.find(s => s.id === selectedService);
    const material = materials.find(m => m.id === selectedMaterial);
    const complex = complexity.find(c => c.id === selectedComplexity);
    
    if (!service || !material || !complex) return 0;
    
    return Math.round(service.basePrice * material.multiplier * complex.multiplier);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-accent/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">ATELIER</h1>
            <div className="hidden md:flex gap-8">
              {['Главная', 'Услуги', 'Прайс', 'Контакты', 'Отзывы'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-primary-foreground hover:text-accent transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
            <Button variant="outline" className="md:hidden bg-accent text-primary border-accent">
              Меню
            </Button>
          </div>
        </div>
      </nav>

      <section id="главная" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Элегантность в каждой детали
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
              Создаём изысканные образы с утончённым вниманием к каждой строчке
            </p>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg"
              onClick={() => scrollToSection('прайс')}
            >
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </section>

      <section id="услуги" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: 'Scissors', title: 'Подгонка по фигуре', desc: 'Идеальная посадка для каждого изделия' },
              { icon: 'Shirt', title: 'Пошив на заказ', desc: 'Создание уникальной одежды по вашим меркам' },
              { icon: 'Sparkles', title: 'Декорирование', desc: 'Эксклюзивная отделка и украшение изделий' },
            ].map((service, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow duration-300 border-accent/20">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name={service.icon} size={32} className="text-accent" />
                  </div>
                  <CardTitle className="text-center text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{service.desc}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="прайс" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Калькулятор стоимости</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle>Рассчитайте стоимость услуги</CardTitle>
                <CardDescription>Выберите параметры для точного расчёта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Тип услуги</label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Материал изделия</label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите материал" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Сложность работы</label>
                  <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите сложность" />
                    </SelectTrigger>
                    <SelectContent>
                      {complexity.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-6" />

                <div className="bg-accent/10 p-6 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Расчётная стоимость</p>
                  <p className="text-4xl font-bold text-foreground">
                    {calculatePrice() > 0 ? `${calculatePrice()} ₽` : '—'}
                  </p>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90 text-primary" size="lg">
                  Записаться на примерку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="отзывы" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Отзывы клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Екатерина', text: 'Великолепная работа! Платье сидит идеально, все детали выполнены безупречно.', rating: 5 },
              { name: 'Александр', text: 'Сшили костюм точно по меркам. Качество тканей и работы на высоте.', rating: 5 },
              { name: 'Мария', text: 'Очень довольна подгонкой пальто. Мастера настоящие профессионалы своего дела!', rating: 5 },
            ].map((review, idx) => (
              <Card key={idx} className="border-accent/20">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-accent/20">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Icon name="MapPin" size={24} className="text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Адрес</h3>
                        <p className="text-muted-foreground">Москва, ул. Тверская, д. 12</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Icon name="Phone" size={24} className="text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Телефон</h3>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Icon name="Clock" size={24} className="text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Часы работы</h3>
                        <p className="text-muted-foreground">Пн-Пт: 10:00 - 20:00<br />Сб-Вс: 11:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-xl">Напишите нам</h3>
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="tel"
                      placeholder="Телефон"
                      className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <textarea
                      placeholder="Сообщение"
                      rows={4}
                      className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <Button className="w-full bg-accent hover:bg-accent/90 text-primary">
                      Отправить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">ATELIER</h2>
          <p className="text-primary-foreground/80">Элегантность в каждой детали</p>
          <div className="flex justify-center gap-6 mt-6">
            <Icon name="Instagram" size={24} className="cursor-pointer hover:text-accent transition-colors" />
            <Icon name="Facebook" size={24} className="cursor-pointer hover:text-accent transition-colors" />
            <Icon name="Mail" size={24} className="cursor-pointer hover:text-accent transition-colors" />
          </div>
          <p className="text-sm text-primary-foreground/60 mt-6">© 2024 Atelier. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
