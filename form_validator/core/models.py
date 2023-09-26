from django.db import models

# Create your models here.
class Form(models.Model):
    id = models.AutoField(primary_key=True)
    pdf = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='', blank=True)

    def __str__(self):
        return "id: "+ str(self.id) +"Nome: " + self.name + "- pdf: " + self.pdf + " - Criado em: " + str(self.created_at)
