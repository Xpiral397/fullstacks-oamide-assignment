from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import MenuNode


class MenuNodeViewTest(APITestCase):
    def setUp(self):
        # Test data: complex nested structure
        self.test_data = [
            {
                "name": "Main Menu",
                "children": [
                    {
                        "name": "File",
                        "children": [
                            {
                                "name": "New",
                                "children": [{"name": "Project"}, {"name": "File"}],
                            },
                            {
                                "name": "Open",
                                "children": [
                                    {
                                        "name": "Recent",
                                        "children": [
                                            {"name": "Project 1"},
                                            {"name": "Project 2"},
                                        ],
                                    }
                                ],
                            },
                        ],
                    },
                    {"name": "Edit", "children": [{"name": "Undo"}, {"name": "Redo"}]},
                    {
                        "name": "View",
                        "children": [
                            {
                                "name": "Layout",
                                "children": [{"name": "Grid"}, {"name": "List"}],
                            },
                            {
                                "name": "Themes",
                                "children": [
                                    {"name": "Dark Mode"},
                                    {"name": "Light Mode"},
                                ],
                            },
                        ],
                    },
                ],
            }
        ]

    def test_post_menu_nodes(self):
        url = reverse("menu-node-list")  # Adjust with your actual URL name
        response = self.client.post(url, self.test_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check if data is saved in the database
        self.assertEqual(
            MenuNode.objects.count(), 14
        )  # 14 nodes in the nested structure

    def test_get_menu_nodes(self):
        # First, post the data
        self.client.post(reverse("menu-node-list"), self.test_data, format="json")

        # Now, get the data
        response = self.client.get(reverse("menu-node-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Verify that the structure is correctly nested in the response
        response_data = response.json()
        self.assertEqual(len(response_data), 1)  # Should have 1 root node ("Main Menu")
        main_menu = response_data[0]
        self.assertEqual(main_menu["name"], "Main Menu")
        self.assertEqual(len(main_menu["children"]), 3)  # "File", "Edit", "View"

        file_menu = main_menu["children"][0]
        self.assertEqual(file_menu["name"], "File")
        self.assertEqual(len(file_menu["children"]), 2)  # "New", "Open"

        new_menu = file_menu["children"][0]
        self.assertEqual(new_menu["name"], "New")
        self.assertEqual(len(new_menu["children"]), 2)  # "Project", "File"
