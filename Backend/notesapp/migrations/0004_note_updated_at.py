
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notesapp', '0003_note_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
