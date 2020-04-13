from django.db import migrations


def forwards_func(apps, schema_editor):
    Site = apps.get_model("sites", "Site")
    main_site, _ = Site.objects.get_or_create(pk=1)
    main_site.name = main_site.domain = 'covexit.de'
    main_site.save()
    local_site, _ = Site.objects.get_or_create(pk=2)
    local_site.name = local_site.domain = 'localhost:3000'
    local_site.save()


def reverse_func(apps, schema_editor):
    Site = apps.get_model("sites", "Site")
    Site.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_add_product_classes'),
    ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
    ]
