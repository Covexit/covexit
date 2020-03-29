from django.conf import settings
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion


def insert_data(apps, schema_editor):
    Company = apps.get_model('companies', 'Company')
    db_alias = schema_editor.connection.alias
    Company.objects.using(db_alias) \
        .create(name="Inges Stoffladen", city="Duisburg",
                phone="01283439342", mail="inge@stoffladen.com",
                zip="21432", street="Stoffstraße 24b",
                latitude=0.0, longitude=0.0, owner=None) \
        .save()


class Migration(migrations.Migration):
    dependencies = [
        ('companies', '0001_add_company_base'),
    ]

    operations = [migrations.RunPython(insert_data, reverse_code=migrations.RunPython.noop)]
