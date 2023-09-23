from django.db import models

# Create your models here.
class Form(models.Model):
    ID = models.AutoField(primary_key=True)
    PATH = models.CharField(max_length=255)
    CREATED_AT = models.DateTimeField(auto_now_add=True)
    NAME = models.CharField(max_length=255)

    def __str__(self):
        return "ID: "+ self.ID +"Nome: " + self.NAME + "- PATH: " + self.PATH + " - Criado em: " + str(self.CREATED_AT)
